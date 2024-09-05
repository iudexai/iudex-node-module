
import 'dotenv/config';
import { instrument, iudexFastify } from '../src/instrumentation/index';
instrument({
  serviceName: 'test-fastify-instrumentation',
  githubUrl: 'https://github.com/iudexai/ghost-shell',
  publicWriteOnlyIudexApiKey:
    'ixk_5d1d59f0fda17554b15ed2a2e407131306ce8f5260f7ae821e9f3684423a3afa',
  env: 'dev',
  redact: 'outcomes',
});

import Fastify from 'fastify';


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


const fastify = Fastify({
  logger: {
    ...iudexFastify.logger,
    level: 'info',
  },
});

fastify.get('/', (request, reply) => {
  const outcomes = rollTheDice(2, 1, 6);
  request.log.info('request log outcomes', outcomes);
  console.log('console log outcomes', outcomes);
  void reply.send(outcomes);
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  console.log(`Server is now listening on ${address}`);
});
