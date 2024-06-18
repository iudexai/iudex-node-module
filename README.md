- [How it works](#how-it-works)
  - [`instrument`](#instrument)
    - [Options](#options)
  - [`emitOtelLog`](#emitotellog)
    - [Options](#options-1)
- [Autoinstrumented](#autoinstrumented)
- [Express](#express)
- [Fastify](#fastify)
- [Lambda](#lambda)
- [Pino](#pino)
    - [Pino config](#pino-config)
- [Console](#console)

# How it works
The `iudex` package contains the function `instrument` which automatically attaches to libraries you use
and starts sending trace data to `iudex`. Separately, logs sent via console are also sent. If you use another
logger library, find its instrumentation instructions or manually call `emitOtelLog` to send a log.

## `instrument`
`instrument` which automatically attaches to libraries you use and starts sending trace data to `iudex`.

[Supported autoinstrumentations](https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/metapackages/auto-instrumentations-node/README.md#supported-instrumentations) include: console * cassandra-driver * express * http * graphql * ioredis * knex * koa * memcahced * mongodb * mongoose * mysql * mysql2 * nestjs * pg * redis * restify * socket.io * undici. Go to [Autoinstrumentated](#autoinstrumented) for instructions.

For libraries that are not autoinstrumented, follow the instructions from the table of contents for that specific library.

### Options
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

## `emitOtelLog`
Send a log to `iudex`.

### Options
* `level: string;`
  * Sets level (INFO, WARN, ERROR, FATAL, DEBUG) of the log.
* `body: any`
  * Sets the content of the log.
* `severityNumber?: number`
  * Sets the severity of the log as a number.
  * `level` takes overwrites this.
* `attributes?: Record<string, any>`
  * Sets attributes of the log
    * We highly recommend sending at least userId and requestId
    * We suggest sending function or file name
  * Attributes cannot contain nonserializable objects.


# Autoinstrumented
1. Install dependencies.
```bash
npm install iudex
```
2. Add this code snippet to the top your entry point file (likely `index.ts`). Skip this step if you already call `instrument` on your server.
```typescript
import { instrument, iudexFastify } from 'iudex';
instrument({
  serviceName: <your_service_name>,
  iudexApiKey: <your_api_key>,        // optionally pulls from process.env.IUDEX_API_KEY
  githubUrl: <your_github_url_here>,  // optionally pulls from process.env.GITHUB_URL
});
```

# Express
1. Install dependencies.
```bash
npm install iudex
```
2. Add this code snippet to the top of your server file (likely `app.ts` or `index.ts`).
```typescript
// Import this before everything else
// import 'dotenv/config'; // Import dot env here if you use it
import { instrument } from 'iudex';
instrument({
  serviceName: <your_service_name>,
  iudexApiKey: <your_api_key>,        // optionally pulls from process.env.IUDEX_API_KEY
  githubUrl: <your_github_url_here>,  // optionally pulls from process.env.GITHUB_URL
});
```


# Fastify
1. Install dependencies.
```bash
npm install iudex
```
2. Add this code snippet to the top of your server file (likely `server.ts`), add `iudexFastify.logger` to the Fastify config.
```typescript
import { instrument, iudexFastify } from 'iudex';
instrument({
  serviceName: <your_service_name>,
  iudexApiKey: <your_api_key>,        // optionally pulls from process.env.IUDEX_API_KEY
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


# Lambda
1. Install dependencies.
```bash
npm install iudex
```
2. At the top of your lambda handler file, add instrumentation.
```typescript
import { instrument, withTracing } from 'iudex';
instrument({
  serviceName: <your_service_name>,
  iudexApiKey: <your_api_key>,        // optionally pulls from process.env.IUDEX_API_KEY
  githubUrl: <your_github_url_here>,  // optional, also optionally pulls from process.env.GITHUB_URL
});
```
1. Wrap all lambda functions you want traced with `withTracing`.
```typescript
export const handler = withTracing(() => {
  // ...
});
```


# Pino
1. Install dependencies.
```bash
npm install iudex
```
2. Add this code snippet to the top your entry point file (likely `index.ts`). Skip this step if you already call `instrument` on your server.
```typescript
import { instrument, iudexFastify } from 'iudex';
instrument({
  serviceName: <your_service_name>,
  iudexApiKey: <your_api_key>,        // optionally pulls from process.env.IUDEX_API_KEY
  githubUrl: <your_github_url_here>,  // optionally pulls from process.env.GITHUB_URL
});
1. Find your where you instantiate your pino logger and add Iudex params.
```typescript
import pino from 'pino';
import { iudexPino } from 'iudex';

const logger = pino(...iudexPino.args);
```

### Pino config
If you have configured pino, use `iudexPino.options` and `iudexPino.destination` separately.
* `iudexPino.options` sets the `mixin` property
* `iudexPino.destination` sets the `write` property

```typescript
import pino from 'pino';
import { iudexPino } from 'iudex';

const logger = pino(iudexPino.options, iudexPino.destination);
```


# Console
1. Install dependencies.
```bash
npm install iudex
```
2. Add this code snippet to the top your entry point file (likely `index.ts`). Skip this step if you already call `instrument` on your server.
```typescript
import { instrument, iudexFastify } from 'iudex';
instrument({
  serviceName: <your_service_name>,
  iudexApiKey: <your_api_key>,        // optionally pulls from process.env.IUDEX_API_KEY
  githubUrl: <your_github_url_here>,  // optionally pulls from process.env.GITHUB_URL
});
