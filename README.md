# Iudex

Next generation observability.

### Table of contents
- [Iudex](#iudex)
    - [Table of contents](#table-of-contents)
- [Getting Started](#getting-started)
    - [Autoinstrument](#autoinstrument)
    - [Express](#express)
    - [Fastify](#fastify)
    - [Lambda](#lambda)
      - [With API Gateway](#with-api-gateway)
    - [Pino](#pino)
      - [Multiple Destinations](#multiple-destinations)
    - [Console](#console)
    - [Custom logger](#custom-logger)
    - [Any function](#any-function)
- [Slack Alerts](#slack-alerts)
- [API reference](#api-reference)
    - [instrument](#instrument)
      - [Options](#options)
    - [emitOtelLog](#emitotellog)
      - [Options](#options-1)
      - [trackAttribute](#trackattribute)


# Getting Started
Instrumenting your JavaScript or TypeScript codebase with Iudex just takes a few steps.

[Supported autoinstrumentations](https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/metapackages/auto-instrumentations-node/README.md#supported-instrumentations) include: console * cassandra-driver * express * http * graphql * ioredis * knex * koa * memcahced * mongodb * mongoose * mysql * mysql2 * nestjs * pg * redis * restify * socket.io * undici.

Check out the [Autoinstrument](#autoinstrument) section for installation instructions.

For libraries that are not autoinstrumented, follow the instructions from the table of contents for that specific library.

1. Install dependencies.
```bash
npm install iudex
```
2. Follow the instructions below for your frameworks.
3. Make sure the app has access to the environment variable `IUDEX_API_KEY`. You can manually add this to `instrument` as well if you use something like a secrets manager.
4. You should be all set! Go to [https://app.iudex.ai/](https://app.iudex.ai/) and enter your API key.
5. Go to [https://app.iudex.ai/logs](https://app.iudex.ai/logs) and press `Search` to view your logs.


### Autoinstrument
Add this code snippet to the top your entry point file (likely `index.ts`). Skip this step if you already call `instrument` on your server.
```typescript

import { instrument, iudexFastify } from 'iudex';
instrument({
  serviceName: <your_service_name>,
});
```

### Express
Add this code snippet to the top of your server file (likely `app.ts` or `index.ts`).

```typescript
import { instrument } from 'iudex';
instrument({
  serviceName: <your_service_name>,
  githubUrl: <your_github_url_here>,  // optionally pulls from process.env.GITHUB_URL
});
```

### Fastify
Add this code snippet to the top of your server file (likely `server.ts`), add `iudexFastify.logger` to the Fastify config.

```typescript
import { instrument, iudexFastify } from 'iudex';
instrument({
  serviceName: <your_service_name>,
  githubUrl: <your_github_url_here>,  // optionally pulls from process.env.GITHUB_URL
});

//...

const fastify = Fastify({
  logger: {
    ...iudexFastify.logger,
    level: 'info',
  },
});
```

### Lambda
1. Add this code snippet to the top of your handler file.

```typescript
import { instrument, iudexAwsLambda } from 'iudex';
const { withTracing } = iudexAwsLambda;
instrument({
  serviceName: <your_service_name>,
  githubUrl: <your_github_url_here>,  // optional, also optionally pulls from process.env.GITHUB_URL
});
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
  serviceName: <your_service_name>,
  githubUrl: <your_github_url_here>,  // optional, also optionally pulls from process.env.GITHUB_URL
});
```


### Pino
It is required that you call `instrument` before instantiating the pino `logger`. Add Iudex params which will add `iudex` as an output destination for pino.
```typescript
import pino from 'pino';
import { iudexPino } from 'iudex';

const logger = pino(...iudexPino.args);
```

#### Multiple Destinations
If you have configured pino options or destinations, use `iudexPino.options` and `iudexPino.destination` for fine-grained control.
* `iudexPino.options` sets the `mixin` property
* `iudexPino.destination` sets the `write` property

```typescript
import pino from 'pino';
import { iudexPino } from 'iudex';

const write = str => {
  iudexPino.destination.write(str);
  console.log(str);
};
const logger = pino(iudexPino.options, { write });
```


### Console
Add this code snippet to the top your entry point file (likely `index.ts`). Skip this step if you already call `instrument` on your server.

```typescript
import { instrument, iudexFastify } from 'iudex';
instrument({
  serviceName: <your_service_name>,
  githubUrl: <your_github_url_here>,  // optionally pulls from process.env.GITHUB_URL
});
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


### Any function
Its recommended that you trace


# Slack Alerts
You can easily configure Slack alerts on a per-log basis.

First visit [https://app.iudex.ai/logs](https://app.iudex.ai/logs) and click on the `Add to Slack` button in the top right.

Once installed to your workspace, tag your logs with the `iudex.slack_channel_id` attribute.
```typescript
logger.info('Hello from Slack!', { 'iudex.slack_channel_id': 'YOUR_SLACK_CHANNEL_ID' })
```
Your channel ID can be found by clicking the name of the channel in the top left, then at the bottom of the dialog that pops up.

As long as the channel is public or you've invited the Iudex app, logs will be sent as messages to their tagged channel any time they are logged.


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
  * By default
* `headers?: Record<string, string>`
  * Merges into the header object for the fetch that targets the `baseUrl`.
* `settings?: Record<string, boolean>`
  * Optionally turn off specified instrumentations by setting it to `false`.
    * instrumentConsole


### emitOtelLog
`emitOtelLog` is a function that sends a log to `iudex`.

#### Options
* `level: string;`
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

#### trackAttribute
`trackAttribute` adds an attribute to the current active span.
* `key: string`
* `value: any`
