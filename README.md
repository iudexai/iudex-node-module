# IUDEX Node

Next generation observability. For browser / worker compatible IUDEX, use [iudex-web](https://github.com/iudexai/iudex-web#readme)


### Supported libraries

✅ aws-api-gateway
✅ console
✅ pino-http
✅ trpc

[Supported libraries from OTel](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/metapackages/auto-instrumentations-node#supported-instrumentations):

✅ amqplib
✅ aws-lambda
✅ aws-sdk
✅ bunyan
✅ cassandra-driver
✅ connect
✅ cucumber
✅ dataloader
✅ dns
✅ express
✅ fastify
✅ generic-pool
✅ graphql
✅ grpc
✅ hapi
✅ http
✅ ioredis
✅ knex
✅ koa
✅ lru-memoizer
✅ memcached
✅ mongodb
✅ mongoose
✅ mysql
✅ mysql2
✅ nestjs-core
✅ net
✅ pg
✅ pino
✅ redis
✅ restify
✅ socket.io
✅ undici
✅ winston

[Supported libraries from OpenLLMetry](https://github.com/traceloop/openllmetry-js/tree/main):

✅ @azure/openai
✅ @anthropic-ai/sdk
✅ @aws-sdk/client-bedrock-runtime
✅ @google-cloud/vertexai
✅ @qdrant/js-client-rest
✅ chromadb
✅ cohere-ai
✅ langchain
✅ llamaindex
✅ openai
✅ pinecone-client


### Table of contents
- [IUDEX Node](#iudex-node)
    - [Supported libraries](#supported-libraries)
    - [Table of contents](#table-of-contents)
- [Getting Started](#getting-started)
    - [Autoinstrumented libraries](#autoinstrumented-libraries)
    - [Express](#express)
    - [Fastify](#fastify)
    - [TRPC](#trpc)
    - [Lambda](#lambda)
      - [With API Gateway](#with-api-gateway)
    - [Pino](#pino)
      - [Multiple Destinations](#multiple-destinations)
    - [Console](#console)
    - [Custom logger](#custom-logger)
    - [Tracing functions](#tracing-functions)
- [Slack Alerts](#slack-alerts)
- [API reference](#api-reference)
    - [instrument](#instrument)
      - [Options](#options)
    - [emitOtelLog](#emitotellog)
      - [Options](#options-1)
    - [trackAttribute](#trackattribute)
    - [withTracing](#withtracing)
      - [Example](#example)
      - [Arguments](#arguments)
    - [useTracing](#usetracing)
      - [Example](#example-1)


# Getting Started
Instrumenting your code with Iudex just takes a few steps.

1. Install dependencies.
```bash
npm install iudex
```
2. Follow the below instructions for your frameworks or use autoinstrumentation.
3. Make sure your app has access to the environment variable `IUDEX_API_KEY`. You can manually add this to `instrument` as well if you use something like a secrets manager.
4. You should be all set! Go to [https://app.iudex.ai/](https://app.iudex.ai/) and enter your API key.
5. Go to [https://app.iudex.ai/logs](https://app.iudex.ai/logs) and press `Search` to view your logs.

### Autoinstrumented libraries
Add this code to the top your entrypoint file (likely `index.ts`).
```typescript
import { instrument } from 'iudex';
instrument({
  serviceName: 'YOUR_SERVICE_NAME', // highly encouraged
  env: 'prod', // dev, local, etc
  publicWriteOnlyIudexApiKey: 'YOUR_PUBLIC_WRITE_ONLY_KEY', // only ever commit your WRITE ONLY key
});
// ^ run above your other imports
```
You should be all set! Iudex will now record logs and trace the entire life cycle for each request.

Go to [https://app.iudex.ai/](https://app.iudex.ai/) to start viewing your logs and traces!

For libraries that are not autoinstrumented or if your project uses `"type": "module"`, follow the instructions from the table of contents for that specific library.


### Express
Add this code snippet to the top of your server file (likely `app.ts` or `index.ts`).

```typescript
import { instrument } from 'iudex';
instrument({
  serviceName: 'YOUR_SERVICE_NAME', // highly encouraged
  env: 'prod', // dev, local, etc
  publicWriteOnlyIudexApiKey: 'YOUR_PUBLIC_WRITE_ONLY_KEY', // only ever commit your WRITE ONLY key
});
// ^ run above your other imports
```

### Fastify
Add this code snippet to the top of your server file (likely `server.ts`), add `iudexFastify.logger` to the Fastify config.

```typescript
import { instrument, iudexFastify } from 'iudex';
instrument({
  serviceName: 'YOUR_SERVICE_NAME', // highly encouraged
  env: 'prod', // dev, local, etc
  publicWriteOnlyIudexApiKey: 'YOUR_PUBLIC_WRITE_ONLY_KEY', // only ever commit your WRITE ONLY key
});
// ^ run above your other imports

const fastify = Fastify({
  logger: {
    ...iudexFastify.logger,
    level: 'info',
  },
});
```

### TRPC
TRPC instrumentation automatically works with `pino-http` on your server.

If you want to log using custom middleware, you can write your own middleware.
```typescript
const loggedProcedure = publicProcedure.use(withTracing((opts) => {
  trackAttribute('path', opts.path);
  trackAttribute('type', opts.type);
  return opts.next();
}));
```
We are in the process of making this better.


### Lambda
1. Add this code snippet to the top of your handler file.

```typescript
import { instrument, iudexAwsLambda } from 'iudex';
const { withTracing } = iudexAwsLambda;
instrument({
  serviceName: 'YOUR_SERVICE_NAME', // highly encouraged
  env: 'prod', // dev, local, etc
  publicWriteOnlyIudexApiKey: 'YOUR_PUBLIC_WRITE_ONLY_KEY', // only ever commit your WRITE ONLY key
});
// ^ run above your other imports
```

2. Wrap all lambda functions you want traced with `withTracing`.
```typescript
export const handler = withTracing(
  // Your handler function goes here
);
```

#### With API Gateway
If you use AWS API Gateway along with lambdas, instead import `iudexAwsApiGateway` and wrap your lambda functions the same way using `withTracing`.
```typescript
import { instrument, iudexAwsApiGateway } from 'iudex';
const { withTracing } = iudexAwsApiGateway;
instrument({
  serviceName: 'YOUR_SERVICE_NAME', // highly encouraged
  env: 'prod', // dev, local, etc
  publicWriteOnlyIudexApiKey: 'YOUR_PUBLIC_WRITE_ONLY_KEY', // only ever commit your WRITE ONLY key
});
// ^ run above your other imports
```


### Pino
Call `instrument` before instantiating the pino `logger`. Create your logger using `iudexPino.args` which will add IUDEX as an output destination for pino.
```typescript
import { iudexPino } from 'iudex';
import pino from 'pino';

const logger = pino(...iudexPino.args);
```

#### Multiple Destinations
If you have configured pino options or destinations, use `iudexPino.options` and `iudexPino.destination` for fine-grained control.
* `iudexPino.options` sets the `mixin` property
* `iudexPino.destination` sets the `write` property

```typescript
import { iudexPino } from 'iudex';
import pino from 'pino';

const write = str => {
  iudexPino.destination.write(str);
  console.log(str);
};
const logger = pino(iudexPino.options, { write });
```


### Console
Add this code snippet to the top your entry point file (likely `index.ts`). Skip this step if you already call `instrument` on your server.

```typescript
import { instrument } from 'iudex';
instrument({
  serviceName: 'YOUR_SERVICE_NAME', // highly encouraged
  env: 'prod', // dev, local, etc
  publicWriteOnlyIudexApiKey: 'YOUR_PUBLIC_WRITE_ONLY_KEY', // only ever commit your WRITE ONLY key
});
// ^ run above your other imports
```

Objects with the key `ctx` will have values in `ctx` added as attributes to the log. Example:
```typescript
console.log('hello', { ctx: { userId: '123' } })
```
will create a log line with the `userId` attribute set to `123`.


### Custom logger
Use `emitOtelLog` to send logs to `iudex`. You have have called `instrument` somewhere before `emitOtelLog`.

```typescript
import { emitOtelLog } from 'iudex';

/**
 * Custom logger example
 */
function createLogger(level: keyof typeof console) {
  return function logger(body: string, attributes: Record<string, any>) {
    console[level](body, attributes);
    emitOtelLog({ level, body, attributes })
  };
}
```


### Tracing functions
Its recommended that you trace functions that are not called extremely frequently and that tend to be entry points for complex functionality. Examples of this are API routes, service controllers, and database clients. You can trace your function by wrapping it with `withTracing`.

```typescript
import { withTracing } from 'iudex';

const myFunction = withTracing(async () => {
  console.log('I am traced');
}, { name: 'myFunction', trackArgs: true });

await myFunction();
// console: I am traced
```

Anytime `myFunction` is called, it will create a span layer in a trace. `trackArgs` will also track the arguments for the function. Tracked arguments will be truncated at 5000 characters. If you want to track specific parameters, it is recommended that you log them at the beginning of the function.


# Slack Alerts
You can easily configure Slack alerts on a per-log basis with custom filters an logic by adding it in code.

1. Visit [https://app.iudex.ai/logs](https://app.iudex.ai/logs) and click on the `Add to Slack` button in the top right.

2.  Once installed to your workspace, tag your logs with the `iudex.slack_channel_id` attribute.
```typescript
// Example using logger
logger.info({ 'iudex.slack_channel_id': 'YOUR_SLACK_CHANNEL_ID' }, 'Hello from Slack!');
// Example using console, you must set { ctx }
console.log('Hello from Slack!', { ctx: { 'iudex.slack_channel_id': 'YOUR_SLACK_CHANNEL_ID' } });
```

3. Your channel ID can be found by clicking the name of the channel in the top left, then at the bottom of the dialog that pops up.

4. As long as the channel is public or you've invited the IUDEX app, logs will be sent as messages to their tagged channel any time they are logged.


# API reference
The `iudex` package contains the function `instrument` which automatically attaches to libraries you use
and starts sending trace data to `iudex`. Separately, logs sent via console are also sent. If you use another
logger library, find its instrumentation instructions or manually call `emitOtelLog` to send a log.

### instrument
`instrument` is a function that automatically attaches to libraries you use and starts sending trace data to `iudex`.

#### Options
* `baseUrl?: string`
  * Sets the url to send the trace and log events to.
  * By default this is `api.iudex.ai`.
* `iudexApiKey?: string`
  * Sets the api key which is required to send logs.
  * By default this looks for an api key in `process.env.IUDEX_API_KEY`.
* `serviceName?: string`
  * Sets the service name for the instrumented logs.
  * While optional, setting this is highly recommended.
* `instanceId?: string`
  * Sets the id of the runtime instance.
* `gitCommit?: string`
  * Sets the associated git commit hash for the runtime.
  * This is optional but setting it will help track deployments.
  * By default this parses the commit from the runtime's git instance if available.
* `githubUrl?: string`
  * Sets the GitHub url so logs with associated filenames can be hyperlinked.
  * Git commit hash is also required for the hyperlinking.
* `env?: string`
  * Sets the environment of the logs and traces
  * While optional, this is highly recommended because separating development vs production logs denoises both.
  * By default uses `process.env.NODE_ENV`
* `headers?: Record<string, string>`
  * Merges into the header object for the fetch that targets the `baseUrl`.
* `settings?: Record<string, boolean>`
  * Optionally turn off specified instrumentations by setting it to `false`.
    * instrumentConsole


### emitOtelLog
`emitOtelLog` is a function that sends a log to `iudex`.

#### Options
* `level: string`
  * Sets level (`INFO`, `WARN`, `ERROR`, `FATAL`, `DEBUG`) of the log.
* `body: any`
  * Sets the content of the log.
* `severityNumber?: number`
  * Sets the severity of the log as a number.
  * `level` overwrites this.
* `attributes?: Record<string, any>`
  * Sets attributes of the log.
    * We highly recommend sending at least userId and requestId.
    * We suggest sending function or file name.
  * Attributes cannot contain nonserializable objects.

### trackAttribute
`trackAttribute` adds an attribute to the current active span.
* `key: string`
* `value: any`

### withTracing
`withTracing` instruments a function by wrapping with a trace context. Wrapped functions can be called elsewhere and will always be traced.

#### Example
```typescript
import { withTracing } from 'iudex';

const myFunction = withTracing(async () => {
  console.log('I am traced');
}, { name: 'myFunction' });

await myFunction();
// console: I am traced
```

#### Arguments
* `fn: Function`
  * Function to trace.
* `opts`
  * `name?: string`
    * Name of the trace.
  * `trackArgs?: boolean`
    * Toggles whether or not to track arguments passed into the function.
    * Tracked args are stored in `attributes.arg` or `attributes.args` if there are multiple arguments.
    * Defaults to false.
  * `attributes?: Record<string, any>`
    * Sets attributes of the trace.
  * `setSpan?: (span: Span, ret: ReturnType<Function>) => void`
    * Overrides handling the span.

### useTracing
`useTracing` instruments and runs a function with trace context. The arguments are the same as `withTracing`

#### Example
```typescript
import { useTracing } from 'iudex';

await useTracing(async () => {
  console.log('I am traced');
}, { name: 'myFunction' });

// console: I am traced
