import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { BatchSpanProcessor, NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { Resource } from '@opentelemetry/resources';
import {
  SEMRESATTRS_SERVICE_INSTANCE_ID,
  SEMRESATTRS_SERVICE_NAME,
} from '@opentelemetry/semantic-conventions';
import { logs } from '@opentelemetry/api-logs';
import {
  LoggerProvider,
  BatchLogRecordProcessor,
} from '@opentelemetry/sdk-logs';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-proto';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import _ from 'lodash';
import { is } from './utils.js';
import { DiagConsoleLogger, DiagLogLevel, Span, SpanStatusCode, diag, trace } from '@opentelemetry/api';

export * from './utils.js';
export * as iudexPino from './pino.js';
export * as iudexFastify from './fastify.js';

if (process.env.IUDEX_DEBUG) {
  console.log('IUDEX_DEBUG on. Setting diag logger to console.');
  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);
}

export function instrument({
  baseUrl = process.env.IUDEX_EXPORTER_OTLP_ENDPOINT
    || process.env.OTEL_EXPORTER_OTLP_ENDPOINT
    || 'https://api.iudex.ai',
  iudexApiKey = process.env.IUDEX_API_KEY,
  serviceName = process.env.OTEL_SERVICE_NAME || 'unknown-service',
  instanceId,
  gitCommit = process.env.GIT_COMMIT,
  githubUrl = process.env.GITHUB_URL,
  env = process.env.NODE_ENV,
  headers: configHeaders = {},
}: {
  baseUrl?: string;
  iudexApiKey?: string;
  serviceName?: string;
  instanceId?: string;
  gitCommit?: string;
  githubUrl?: string;
  env?: string;
  headers?: Record<string, string>;
} = {}) {
  if (is.instrumented) return;

  if (!iudexApiKey) {
    throw Error(
      `The IUDEX_API_KEY environment variable is missing or empty.` +
      ` Provide IUDEX_API_KEY to the environment on load` +
      ` OR instrument with the iudexApiKey option.` +
      ` Example: \`instrument{ iudexApiKey: 'My_API_Key' })\``,
    );
  }

  const headers: Record<string, string> = {
    'x-api-key': iudexApiKey,
    ...configHeaders,
  };

  if (!gitCommit) {
    try {
      const { execSync } = require('child_process');
      gitCommit = execSync('git rev-parse HEAD').toString().trim();
    } catch (e) {
      // Swallow the error
    }
  }

  const resource = new Resource(_.omitBy({
    [SEMRESATTRS_SERVICE_NAME]: serviceName,
    [SEMRESATTRS_SERVICE_INSTANCE_ID]: instanceId,
    'git.commit': gitCommit,
    'github.url': githubUrl,
    'env': env,
  }, _.isNil));

  // Configure logger
  const logExporter = new OTLPLogExporter({ url: baseUrl + '/v1/logs', headers });
  const logRecordProcessor = new BatchLogRecordProcessor(logExporter);
  const loggerProvider = new LoggerProvider({ resource });
  loggerProvider.addLogRecordProcessor(logRecordProcessor);
  logs.setGlobalLoggerProvider(loggerProvider);

  // Configure tracer
  const traceExporter = new OTLPTraceExporter({ url: baseUrl + '/v1/traces', headers });
  const spanProcessors = [new BatchSpanProcessor(traceExporter)];

  const sdk = new NodeSDK({
    serviceName,
    resource,
    logRecordProcessor,
    spanProcessors,
    instrumentations: [
      getNodeAutoInstrumentations({
        '@opentelemetry/instrumentation-fs': { enabled: false },
      }),
    ],
    autoDetectResources: true,
  });
  sdk.start();

  is.instrumented = true;

  function updateResource(newResource: Record<string, any>) {
    const mergedResource = resource.merge(new Resource(newResource));

    const loggerProvider = new LoggerProvider({ resource: mergedResource });
    loggerProvider.addLogRecordProcessor(logRecordProcessor);
    logs.setGlobalLoggerProvider(loggerProvider);

    const tracerProvider = new NodeTracerProvider({ resource: mergedResource });
    tracerProvider.register();
    tracerProvider.addSpanProcessor(spanProcessors[0]);
    trace.setGlobalTracerProvider(tracerProvider);
  }

  return { updateResource };
}

/**
 * Trace decorator
 */
export function withTracing<T extends (...args: any) => any>(
  fn: T,
  ctx?: { name: string | symbol },
): T {
  if (!is.instrumented) {
    return fn;
  }
  const tracer = trace.getTracer('default');
  return function (...args: Parameters<T>): ReturnType<T> {
    return tracer.startActiveSpan(String(ctx?.name) || fn.name || '<anonymous>', (span: Span) => {
      try {
        const ret = fn(...args);
        // If its a promise, wait for it to resolve, follow async code path
        if (ret.then) {
          return (ret as Promise<ReturnType<T>>)
            .then((res) => {
              span.setStatus({ code: SpanStatusCode.OK });
              return res;
            })
            .catch((err) => {
              span.setStatus({
                code: SpanStatusCode.ERROR,
                message: (err as Error)?.message,
              });
              throw err;
            })
            .finally(() => {
              span.end();
            });
        }
        span.setStatus({ code: SpanStatusCode.OK });
        return ret;
      } catch (err) {
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: (err as Error)?.message,
        });
        throw err;
      } finally {
        span.end();
      }
    });
  } as T;
}
