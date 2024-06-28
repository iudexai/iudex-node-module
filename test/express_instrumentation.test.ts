import 'dotenv/config';
import { instrument, iudexPino, iudexPinoHttp, withTracing } from '../src/instrumentation/index';
instrument({
  serviceName: 'test-express-instrumentation',
  githubUrl: 'https://github.com/iudexai/ghost-shell',
  baseUrl: 'https://pgrev2bga0.execute-api.us-west-2.amazonaws.com',
  env: 'production',
});

import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { pinoHttp } from 'pino-http';
import { pino } from 'pino';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const logger = pino(...iudexPino.args);


/** dice.js **/

function rollOnce(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function rollTheDice(rolls: number, min: number, max: number) {
  const result: number[] = [];
  for (let i = 0; i < rolls; i++) {
    result.push(rollOnce(min, max));
  }
  return result;
}

const tracedFn = withTracing(function _tracedFn(depth: number) {
  console.log('tracedFn at depth:', depth);
  if (depth <= 0) {
    logger.info(depth, 'tracedFn finished');
    return;
  }
  if (Math.random() < 0.5) {
    tracedFn(depth - 1);
    tracedFn(depth - 2);
  } else {
    tracedFn(depth - 1);
  }
});

const errorTracedFn = withTracing(function _errorTracedFn(depth: number) {
  console.log('errorTracedFn at depth:', depth);
  if (depth <= 0) {
    logger.info(depth, 'errorTracedFn finished');
    throw Error('errorTracedFn error');
  }
  errorTracedFn(depth - 1);
});


/** app.ts **/

const PORT = parseInt(process.env.PORT || '8080');
const app = express();
app.use(pinoHttp({ logger, ...iudexPinoHttp.options }));
// app.use(pinoHttp());

app.get('/', (req, res) => {
  const rolls = req.query.rolls ? parseInt(req.query.rolls.toString()) : 2;
  logger.info({ testVal: 'pino' }, `pino logger: Rolling the dice ${rolls} times.`);
  console.log(`console log: Rolling the dice ${rolls} times.`, { ctx: { testVal: 'console' } });
  const outcomes = rollTheDice(rolls, 1, 6);
  res.send(JSON.stringify(outcomes));
});

app.get('/roll', (req, res) => {
  const rolls = req.query.rolls ? parseInt(req.query.rolls.toString()) : 2;
  logger.info({ testVal: 'pino' }, `pino logger: Rolling the dice ${rolls} times.`);
  console.log(`console log: Rolling the dice ${rolls} times.`, { ctx: { testVal: 'console' } });
  const outcomes = rollTheDice(rolls, 1, 6);
  res.send(JSON.stringify(outcomes));
});

app.get('/nested', (req, res) => {
  tracedFn(rollOnce(3,6));
  errorTracedFn(rollOnce(2,4));
  res.send('nested route');
});

/** TRPC **/

const t = initTRPC.create();

const router = t.router;
const publicProcedure = t.procedure;
const loggedProcedure = publicProcedure.use(async (opts, next) => {
  const start = Date.now();

  const result = await opts.next();

  const durationMs = Date.now() - start;
  const meta = { path: opts.path, type: opts.type, durationMs };

  result.ok
    ? console.log('OK request timing:', meta)
    : console.error('Non-OK request timing', meta);
  return result;
});
const appRouter = router({
  userList: loggedProcedure
    .query(async () => {
      return [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    }),
  // /trpc/userById,userById?batch=1&input=%7B%220%22%3A%2201%22%2C%221%22%3A%2202%22%7D
  userById: loggedProcedure
    .input(z.string())
    .query(async (opts) => {
      const { input } = opts;
      return { id: input, name: 'Alice' };
    }),
  userCreate: loggedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      return { id: 99, name: input.name };
    }),
});
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  }),
);


/** Listen **/

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
