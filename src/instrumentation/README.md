# Express
1. Install dependencies.
```bash
npm install iudex
```
1. Create a file called `instrument.ts` or `instrument.js` (can be in the same directory as your server).
1. Import and run `instrument` in `instrument.ts`.
```typescript
// import 'dotenv/config'; // Import dot env here if you use it
import { instrument } from 'iudex';
instrument({
  serviceName: <your_service_name>,
  iudexApiKey: <your_api_key>,        // optionally pulls from process.env.IUDEX_API_KEY
  githubUrl: <your_github_url_here>,  // optionally pulls from process.env.GITHUB_URL
});
```
1. Add the require flag when running your server, e.g. `-r ./instrument.ts`
  * Example: `node -r ./instrument.js ./app.js`
  * Example: `bun run -r ./instrument.ts ./app.ts`


# Fastify
1. Install dependencies.
```bash
npm install iudex
```
1. Create a file called `instrument.ts` or `instrument.js` (can be in the same directory as your server).
1. Import and run `instrument` in `instrument.ts`.
```typescript
// import 'dotenv/config'; // Import dot env here if you use it
import { instrument } from 'iudex';
instrument({
  serviceName: <your_service_name>,
  iudexApiKey: <your_api_key>,        // optionally pulls from process.env.IUDEX_API_KEY
  githubUrl: <your_github_url_here>,  // optional, also optionally pulls from process.env.GITHUB_URL
});
```
1. In your Fastify file (likely `server.ts`), add `iudexFastify.logger` to the Fastify config.
```typescript
import { iudexFastify } from '../src/instrumentation/index';

const fastify = Fastify({
  logger: {
    ...iudexFastify.logger,
    level: 'info',
  },
});
```
1. Add the require flag when running your server, e.g. `-r ./instrument.ts`
  * Example: `node -r ./instrument.js ./server.js`
  * Example: `bun run -r ./instrument.ts ./server.ts`


# Lambda
1. Install dependencies.
```bash
npm install iudex
```
1. At the top of your lambda handler file, add instrumentation.
```typescript
import { instrument, withTracing } from 'iudex';
instrument({
  serviceName: <your_service_name>,
  iudexApiKey: <your_api_key>,        // optionally pulls from process.env.IUDEX_API_KEY
  githubUrl: <your_github_url_here>,  // optional, also optionally pulls from process.env.GITHUB_URL
});
```
1. Wrap all functions you want traced with `withTracing`.
```typescript
export const handler = withTracing(() => {
  ...
});
```


# Pino
1. Install dependencies.
```bash
npm install iudex
```
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
