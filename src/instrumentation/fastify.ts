import {
  SEMATTRS_CODE_FUNCTION,
  SEMATTRS_CODE_FILEPATH,
  SEMATTRS_CODE_LINENO,
} from '@opentelemetry/semantic-conventions';
import _ from 'lodash';
import { getCallerInfo } from './utils.js';
import { RawServerDefault } from 'fastify';
import { iudexPino } from './pino.js';
import { FastifyLoggerOptions, PinoLoggerOptions } from 'fastify/types/logger.js';

export const stream = iudexPino.destination;

export const config = {
  mixinStackDepth: 5,
};

/**
 *
 * Error
    at getCallerInfo (/.../instrumentation/utils.ts:65:14)
    at mixin (/.../instrumentation/fastify.ts:2:54)
    at write (/.../pino/lib/proto.js:79:42)
    at LOG (/.../pino/lib/tools.js:33:23)
    at logServerAddress (/.../fastify/lib/server.js:256:18)
    at wrap (/.../fastify/lib/server.js:137:46)
    at <anonymous> (node:http:29:36)
 */
export function mixin() {
  const { filePath, lineNum, caller } = getCallerInfo(config.mixinStackDepth);
  return _.omitBy({
    [SEMATTRS_CODE_FILEPATH]: filePath,
    [SEMATTRS_CODE_LINENO]: lineNum,
    [SEMATTRS_CODE_FUNCTION]: caller,
  }, _.isNil);
}

export const logger: FastifyLoggerOptions<RawServerDefault> & PinoLoggerOptions = {
  level: 'info',
  mixin,
  stream,
};

export const iudexFastify = {
  stream,
  mixin,
  logger,
};
