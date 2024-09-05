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
  LogRecordProcessor,
  LogRecord,
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
import { nativeConsole } from './utils.js';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { logger } from './fastify.js';

export * from './utils.js';
export * from './trace.js';
export * as iudexPino from './pino.js';
export * as iudexPinoHttp from './pino-http.js';
export * as iudexFastify from './fastify.js';
export * as iudexConsole from './console.js';
export * as iudexTrpc from './trpc.js';
export * as iudexAwsApiGateway from './aws-api-gateway.js';
export * as iudexAwsLambda from './aws-lambda.js';

/**
 * Native console, if you want to use it without logging
 * and without turning off console instrumentation.
 */
export const console = nativeConsole;

if (process.env.IUDEX_DEBUG) {
  console.log('IUDEX_DEBUG on. Setting diag logger to console.');
  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);
}

export type InstrumentConfig = {
  baseUrl?: string;
  iudexApiKey?: string;
  publicWriteOnlyIudexApiKey?: string;
  serviceName?: string;
  instanceId?: string;
  gitCommit?: string;
  githubUrl?: string;
  env?: string;
  headers?: Record<string, string>;
  settings?: Partial<{
    instrumentConsole: boolean,
    instrumentWindow: boolean,
    instrumentXhr: boolean,
  }>;
  redact?: RegExp | string | ((logRecord: LogRecord) => void);
};

export function defaultInstrumentConfig() {
  if (typeof process === 'undefined') {
    (global as any).process = { env: {} };
  }

  if (typeof process.env === 'undefined') {
    (global as any).process.env = {};
  }

  return {
    baseUrl: process.env.IUDEX_EXPORTER_OTLP_ENDPOINT
    || process.env.OTEL_EXPORTER_OTLP_ENDPOINT
    || 'https://api.iudex.ai',
    iudexApiKey: process.env.IUDEX_API_KEY,
    publicWriteOnlyIudexApiKey: process.env.PUBLIC_WRITE_ONLY_IUDEX_API_KEY
    || process.env.NEXT_PUBLIC_WRITE_ONLY_IUDEX_API_KEY,
    serviceName: process.env.OTEL_SERVICE_NAME || 'unknown-service',
    gitCommit: process.env.GIT_COMMIT,
    githubUrl: process.env.GITHUB_URL,
    env: process.env.NODE_ENV,
    headers: {},
    settings: {},
  } satisfies InstrumentConfig;
}

export function instrument(instrumentConfig: InstrumentConfig = {}) {
  if (config.isInstrumented) return;

  const {
    baseUrl,
    iudexApiKey,
    publicWriteOnlyIudexApiKey,
    serviceName,
    instanceId,
    gitCommit,
    githubUrl,
    env,
    headers: configHeaders,
    settings,
    redact,
  }: InstrumentConfig = { ...defaultInstrumentConfig(), ...instrumentConfig };

  if (!publicWriteOnlyIudexApiKey && !iudexApiKey) {
    console.warn(
      `The PUBLIC_WRITE_ONLY_IUDEX_API_KEY environment variable is missing or empty.` +
      ` Provide PUBLIC_WRITE_ONLY_IUDEX_API_KEY to the environment on load` +
      ` OR instrument with the publicWriteOnlyIudexApiKey option.` +
      ` Example: \`instrument{ publicWriteOnlyIudexApiKey: 'My_API_Key' })\``,
    );
    return;
  }

  let url: any = baseUrl;
  if (url == null || url === 'undefined' || url === 'null') {
    url = 'https://api.iudex.ai';
  }

  const headers = buildHeaders({ iudexApiKey, publicWriteOnlyIudexApiKey, headers: configHeaders });
  const resource = buildResource({ serviceName, instanceId, gitCommit, githubUrl, env });

  // Configure logger
  const loggerProvider = new LoggerProvider({ resource });
  const logExporter = new OTLPLogExporter({ url: baseUrl + '/v1/logs', headers });
  const logRecordProcessor = new BatchLogRecordProcessor(logExporter);
  if (redact) {
    const reactLogProcessor = new RedactLogProcessor(redact);
    loggerProvider.addLogRecordProcessor(reactLogProcessor);
  }
  loggerProvider.addLogRecordProcessor(logRecordProcessor);
  logs.setGlobalLoggerProvider(loggerProvider);

  // Configure tracer
  const traceExporter = new OTLPTraceExporter({ url: baseUrl + '/v1/traces', headers });
  const spanProcessor = new BatchSpanProcessor(traceExporter);

  const tracerProvider = new NodeTracerProvider({ resource });
  tracerProvider.register();
  tracerProvider.addSpanProcessor(spanProcessor);
  trace.setGlobalTracerProvider(tracerProvider);

  const instrumentations = [
    // Instrument OTel auto
    ...getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-fs': { enabled: false },
      '@opentelemetry/instrumentation-net': { enabled: false },
      '@opentelemetry/instrumentation-express': {
        spanNameHook(info) {
          return `${info.request.method} ${info.route}`;
        },
      },
      '@opentelemetry/instrumentation-mongoose': {
        dbStatementSerializer(operation, payload) {
          return JSON.stringify({ operation, ...payload });
        },
      },
    }),
    // new PinoHttpInstrumentation(),
    // Instrument ai stuff
    ...traceloopInstrumentations(),
  ];
  registerInstrumentations({ instrumentations });

  // Instrument
  const sdk = new NodeSDK({
    serviceName,
    resource,
    logRecordProcessor,
    spanProcessor,
    autoDetectResources: true,
  });
  sdk.start();

  // explicitly await shutdown to force flush
  process.on('SIGTERM', async () => {
    await sdk.shutdown();
  });

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
      tracerProvider.addSpanProcessor(spanProcessor);
      trace.setGlobalTracerProvider(tracerProvider);
    },
  };
}

export function trackAttribute(key: string, value: any) {
  const activeSpan = trace.getActiveSpan();
  activeSpan?.setAttribute(key, value);
}

/**
 * Adds attribute to current span
 */
export const setAttribute = trackAttribute;

/**
 * Sets status of current span
 */
export function setStatus(code: SpanStatusCode) {
  const activeSpan = trace.getActiveSpan();
  activeSpan?.setStatus({ code });
}

/**
 * Sets error of the current span. Also sets status to error.
 */
export function setError(err: any) {
  const activeSpan = trace.getActiveSpan();
  if (!activeSpan) return;
  activeSpan.setStatus({ code: SpanStatusCode.ERROR, message: err.message });
  activeSpan.setAttribute('exception.message', err.message);
  activeSpan.setAttribute('exception.stacktrace', err.stack);
  activeSpan.recordException(err);
}

/**
 * Sets status of current span
 */
export function setName(name: string) {
  const activeSpan = trace.getActiveSpan();
  activeSpan?.updateName(name);
}

export function buildHeaders(
  instrumentConfig: Pick<
    InstrumentConfig,
    'iudexApiKey' | 'publicWriteOnlyIudexApiKey' | 'headers'
  >,
): Record<string, string> {
  const {
    iudexApiKey,
    publicWriteOnlyIudexApiKey,
    headers: configHeaders,
  } = { ...defaultInstrumentConfig(), ...instrumentConfig };

  const headers: Record<string, string> = { ...configHeaders };
  if (publicWriteOnlyIudexApiKey) {
    headers['x-write-only-api-key'] = publicWriteOnlyIudexApiKey;
  }
  if (iudexApiKey) {
    headers['x-api-key'] = iudexApiKey;
  }
  return headers;
}

export function buildResource(
  instrumentConfig: Pick<
    InstrumentConfig,
    'serviceName' | 'instanceId' | 'gitCommit' | 'githubUrl' | 'env'
  >,
): Resource {
  const {
    serviceName,
    instanceId,
    gitCommit,
    githubUrl,
    env,
  } = { ...defaultInstrumentConfig(), ...instrumentConfig };

  return new Resource(_.omitBy({
    [SEMRESATTRS_SERVICE_NAME]: serviceName,
    [SEMRESATTRS_SERVICE_INSTANCE_ID]: instanceId,
    'git.commit': gitCommit,
    'github.url': githubUrl,
    'env': env,
  }, _.isNil));
}

class RedactLogProcessor implements LogRecordProcessor {
  redactFn: (logRecord: LogRecord) => void;

  constructor(
    public redact: RegExp | string | ((logRecord: LogRecord) => void),
  ) {
    this.redactFn = typeof redact === 'function'
      ? redact
      : (logRecord: LogRecord) => {
        if (typeof logRecord.body === 'string') {
          logRecord.setBody(logRecord.body.replace(redact, 'REDACTED'));
        }
      };
  }

  onEmit(logRecord: LogRecord) {
    this.redactFn(logRecord);
  }

  forceFlush() {
    return Promise.resolve();
  }

  shutdown() {
    return Promise.resolve();
  }
}
