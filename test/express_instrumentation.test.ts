import 'dotenv/config';
import { instrument, iudexPino, iudexPinoHttp } from '../src/instrumentation/index';
instrument({
  serviceName: 'test-express-instrumentation',
  githubUrl: 'https://github.com/iudexai/ghost-shell',
  baseUrl: 'https://pgrev2bga0.execute-api.us-west-2.amazonaws.com',
  // baseUrl: 'https://api.iudex.ai',
});

import express, { Request, Express } from 'express';
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


/** app.ts **/

const PORT = parseInt(process.env.PORT || '8080');
const app: Express = express();
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


/** TRPC **/

const t = initTRPC.create();

const router = t.router;
const publicProcedure = t.procedure;
const appRouter = router({
  userList: publicProcedure
    .query(async () => {
      return [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    }),
  // /trpc/userById,userById?batch=1&input=%7B%220%22%3A%2201%22%2C%221%22%3A%2202%22%7D
  userById: publicProcedure
    .input(z.string())
    .query(async (opts) => {
      const { input } = opts;
      return { id: input, name: 'Alice' };
    }),
  userCreate: publicProcedure
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
