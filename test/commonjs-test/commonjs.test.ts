import 'dotenv/config';
import { instrument, iudexPino } from 'iudex';
instrument({
  serviceName: 'test-express-instrumentation',
  githubUrl: 'https://github.com/iudexai/ghost-shell',
  baseUrl: 'https://pgrev2bga0.execute-api.us-west-2.amazonaws.com',
  // baseUrl: 'https://api.iudex.ai',
});

import express, { Request, Express } from 'express';
import pinoHttp from'pino-http';
import pino from 'pino';

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
app.use(pinoHttp());

app.get('/', (req, res) => {
  const rolls = req.query.rolls ? parseInt(req.query.rolls.toString()) : 2;
  logger.info(`Rolling the dice ${rolls} times.`);
  const outcomes = rollTheDice(rolls, 1, 6);
  res.send(JSON.stringify(outcomes));
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
