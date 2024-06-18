import {
  SEMATTRS_CODE_FUNCTION,
  SEMATTRS_CODE_FILEPATH,
  SEMATTRS_CODE_LINENO,
} from '@opentelemetry/semantic-conventions';
import type { DestinationStream, LoggerOptions } from 'pino';
import _ from 'lodash';
import { convertSeverityValuesToLevel, emitOtelLog, getCallerInfo, is } from './utils.js';


/**
 * Pino write stream to send logs to OpenTelemetry
 */
export function write(str: string) {
  if (!is.instrumented) return;

  try {
    const { level, msg, time, ...rest } = JSON.parse(str);
    const levelNumber = Number(level);
    const severityText = convertSeverityValuesToLevel(levelNumber ? levelNumber : undefined, level);
    emitOtelLog({ level: severityText, severityNumber: level, body: msg, attributes: rest });
  } catch {
    emitOtelLog({ level: 'INFO', body: str });
  }
}

export const config = {
  mixinStackDepth: 4,
};

/**
 * Pino mixin stack looks like this:
 * Error
 *  at mixin
 *  options.mixin
 *  at Pino.write
 *  at Pino.LOG
 *  at ..../test/express_instrumentation.test.ts:43:10
 */
export function mixin(): Record<string, string | number | undefined> {
  const { filePath, lineNum, caller } = getCallerInfo(config.mixinStackDepth);
  return _.omitBy({
    [SEMATTRS_CODE_FILEPATH]: filePath,
    [SEMATTRS_CODE_LINENO]: lineNum,
    [SEMATTRS_CODE_FUNCTION]: caller,
  }, _.isNil);
}

export const destination: DestinationStream = { write };

export const options: LoggerOptions<never> = { mixin };

export const args = [options, destination] as const;

export const iudexPino = {
  write,
  config,
  mixin,
  destination,
  options,
  args,
};
