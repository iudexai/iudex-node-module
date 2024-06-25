import { APIGatewayProxyEventV2, Context, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { SpanStatusCode } from '@opentelemetry/api';

import { withTracing as baseWithTracing } from './trace.js';
import { emitOtelLog } from './utils.js';

export type ApiGatewayProxyEventHandler =
  (event: APIGatewayProxyEventV2, context: Context) => Promise<APIGatewayProxyStructuredResultV2>

export function withTracing(
  fn: ApiGatewayProxyEventHandler,
  ctx: { name: string },
): ApiGatewayProxyEventHandler {
  return baseWithTracing(fn, {
    name: ctx.name,
    setSpan: (span, ret) => ret
      .then((res) => {
        if (res.statusCode && res.statusCode >= 400) {
          span.setStatus({ code: SpanStatusCode.ERROR, message: res.body });
          span.setAttribute('statusCode', res.statusCode);
          emitOtelLog({ level: 'ERROR', body: `${ctx.name} ${res.body}` });
        } else {
          span.setStatus({ code: SpanStatusCode.OK });
          emitOtelLog({ level: 'INFO', body: `${ctx.name} Succeeded` });
        }
      })
      .catch((err) => {
        span.setStatus({ code: SpanStatusCode.ERROR, message: String(err) });
        span.setAttribute('statusCode', 500);
        span.recordException(err as Error);
        emitOtelLog({ level: 'ERROR', body: `${ctx.name} ${String(err)}` });
        throw err;
      })
      .finally(() => {
        span.end();
      }),
  });
}
