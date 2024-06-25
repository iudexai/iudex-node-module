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
import { config } from './utils.js';
import {
  DiagConsoleLogger,
  DiagLogLevel,
  Span,
  SpanStatusCode,
  diag,
  trace,
} from '@opentelemetry/api';
import { instrumentConsole } from './console.js';
import { PinoHttpInstrumentation } from './pino-http.js';
import { traceloopInstrumentations } from './traceloop.js';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';

export * from './utils.js';
export * as iudexPino from './pino.js';
export * as iudexPinoHttp from './pino-http.js';
export * as iudexFastify from './fastify.js';
export * as iudexConsole from './console.js';
export * as iudexTrpc from './trpc.js';

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
  settings = {},
}: {
  baseUrl?: string;
  iudexApiKey?: string;
  serviceName?: string;
  instanceId?: string;
  gitCommit?: string;
  githubUrl?: string;
  env?: string;
  headers?: Record<string, string>;
  settings?: Partial<{ instrumentConsole: boolean }>;
} = {}) {
  if (config.isInstrumented) return;

  if (!iudexApiKey) {
    console.warn(
      `The IUDEX_API_KEY environment variable is missing or empty.` +
      ` Provide IUDEX_API_KEY to the environment on load` +
      ` OR instrument with the iudexApiKey option.` +
      ` Example: \`instrument{ iudexApiKey: 'My_API_Key' })\``,
    );
    return;
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

  // Instrument
  const sdk = new NodeSDK({
    serviceName,
    resource,
    logRecordProcessor,
    spanProcessors,
    instrumentations: [
      // Instrument OTel auto
      getNodeAutoInstrumentations({
        '@opentelemetry/instrumentation-fs': { enabled: false },
        '@opentelemetry/instrumentation-express': {
          spanNameHook(info) {
            console.error('EXPXXXXXXXXXXINFO', info);
            return `${info.request.method} ${info.route}`;
          },
        },
      }),
      // new PinoHttpInstrumentation(),
      // Instrument ai stuff
      traceloopInstrumentations(),
    ],
    autoDetectResources: true,
  });
  sdk.start();

  // Instrument console
  if (settings.instrumentConsole || settings.instrumentConsole == undefined) {
    instrumentConsole();
  }


  // Set global flag
  config.isInstrumented = true;

  return {
    updateResource(newResource: Record<string, any>) {
      const mergedResource = resource.merge(new Resource(newResource));

      const loggerProvider = new LoggerProvider({ resource: mergedResource });
      loggerProvider.addLogRecordProcessor(logRecordProcessor);
      logs.setGlobalLoggerProvider(loggerProvider);

      const tracerProvider = new NodeTracerProvider({ resource: mergedResource });
      tracerProvider.register();
      tracerProvider.addSpanProcessor(spanProcessors[0]);
      trace.setGlobalTracerProvider(tracerProvider);
    },
  };
}

export function trackAttribute(key: string, value: any) {
  const activeSpan = trace.getActiveSpan();
  activeSpan?.setAttribute(key, value);
}

/**
 * Trace decorator
 */
export function withTracing<T extends (...args: any) => any>(
  fn: T,
  ctx: {
    name?: string;
    trackArgs?: boolean;
    attributes?: Record<string, any>;
  } = {},
): T {
  if (!config.isInstrumented) {
    return fn;
  }
  const { name, trackArgs = true, attributes } = ctx;
  const tracer = trace.getTracer('default');
  return function (...args: Parameters<T>): ReturnType<T> {
    return tracer.startActiveSpan(name || fn.name || '<anonymous>', (span: Span) => {
      try {
        if (attributes) {
          span.setAttributes(attributes);
        }
        if (trackArgs) {
          if (args.length === 1) {
            span.setAttribute('arg', args[0]);
          } else if (args.length > 1) {
            span.setAttribute('args', args);
          }
        }
        const ret = fn(...args);
        // If its a promise, wait for it to resolve, follow async code path
        if (ret?.then) {
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
              span.recordException(err as Error);
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
        span.recordException(err as Error);
        throw err;
      } finally {
        span.end();
      }
    });
  } as T;
}
