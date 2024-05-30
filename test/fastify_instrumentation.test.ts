
import 'dotenv/config';
import { instrument, iudexFastify } from '../src/instrumentation/index';
instrument({
  serviceName: 'test-fastify-instrumentation',
  githubUrl: 'https://github.com/iudexai/ghost-shell',
  baseUrl: 'https://pgrev2bga0.execute-api.us-west-2.amazonaws.com',
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
  request.log.info('outcomes', outcomes);
  void reply.send(outcomes);
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  console.log(`Server is now listening on ${address}`);
});
