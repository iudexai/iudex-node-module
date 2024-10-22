import { APIGatewayProxyEventV2, Context, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { context, propagation, Span, SpanStatusCode } from '@opentelemetry/api';

import { withTracing as baseWithTracing } from './trace.js';
import { emitOtelLog } from './utils.js';

export type ApiGatewayProxyEventHandler =
  (event: APIGatewayProxyEventV2, context: Context) => Promise<APIGatewayProxyStructuredResultV2>

export type ApiGatewayWithTracingCtx = {
  name: string;
  trackBody?: boolean;
};

export function createSetSpan(ctx: ApiGatewayWithTracingCtx) {
  return function (span: Span, ret: Promise<APIGatewayProxyStructuredResultV2>) {
    return ret
      .then((res) => {
        if (res.statusCode && res.statusCode >= 500) {
          span.setStatus({ code: SpanStatusCode.ERROR, message: res.body });
          span.setAttribute('http.response.status_code', res.statusCode);
        } else {
          res.statusCode && span.setAttribute('http.response.status_code', res.statusCode);
        }
      })
      .catch((err) => {
        span.setStatus({ code: SpanStatusCode.ERROR, message: err.message });
        span.setAttribute('http.response.status_code', 500);
        span.setAttribute('exception.message', err.message);
        span.setAttribute('exception.stacktrace', err.stack);
        span.recordException(err as Error);
        emitOtelLog({ level: 'ERROR', body: `${ctx.name} ${err.message}` });
        throw err;
      })
      .finally(() => {
        span.end();
      });
  };
}

export function createSetArgs(ctx: ApiGatewayWithTracingCtx) {
  return function (span: Span, args: Parameters<ApiGatewayProxyEventHandler>) {
    span.setAttribute('http.method', args[0].requestContext.http.method);
    span.setAttribute('url.full', args[0].rawPath);
    span.setAttribute('http.route', ctx.name);
    ctx.trackBody && args[0].body && span.setAttribute('http.response.body', args[0].body);
  };
}

export function withTracing(
  fn: ApiGatewayProxyEventHandler,
  ctx: ApiGatewayWithTracingCtx,
): ApiGatewayProxyEventHandler {
  return (event: APIGatewayProxyEventV2, lambdaContext: Context) => {
    // Extract the propagation context from the event headers
    const extractedContext = propagation.extract(context.active(), event.headers);

    // Get the baggage from the extracted context
    const baggage = propagation.getBaggage(extractedContext);

    // Create a new context with the extracted baggage
    const newContext = baggage
      ? propagation.setBaggage(extractedContext, baggage)
      : extractedContext;

    // Use the new context for the function execution
    return context.with(newContext, () =>
      baseWithTracing(fn, {
        name: ctx.name,
        setSpan: createSetSpan(ctx),
        setArgs: createSetArgs(ctx),
      })(event, lambdaContext),
    );
  };
}
