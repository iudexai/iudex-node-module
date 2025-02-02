import {
  SEMATTRS_CODE_FILEPATH,
  SEMATTRS_CODE_FUNCTION,
  SEMATTRS_CODE_LINENO,
} from '@opentelemetry/semantic-conventions';
import { logs } from '@opentelemetry/api-logs';

import _ from 'lodash';
import { context, propagation } from '@opentelemetry/api';

export const config = { isInstrumented: false, nativeConsole: { ...console } };

// Native console
export const nativeConsole = config.nativeConsole;

export function convertSeverityTextToNumber(severityText: string | undefined) {
  if (severityText == undefined) {
    // should be UNSPECIFIED=0 but we pass through undefined for convenience
    return;
  }
  switch (severityText) {
    case 'TRACE':
      return 1;
    case 'DEBUG':
      return 5;
    case 'INFO':
      return 9;
    case 'WARN':
      return 13;
    case 'ERROR':
      return 17;
    case 'FATAL':
      return 21;
    default:
      // should be UNRECOGNIZED=-1 but we pass through undefined for convenience
      return;
  }
}

export function convertSeverityValuesToLevel(
  severityNumber: number | undefined,
  severityText?: string | undefined,
): string {
  // Default to out of scope number.
  severityNumber ||= convertSeverityTextToNumber(severityText) || 0;

  if (severityNumber >= 1 && severityNumber <= 4) {
    return 'TRACE';
  } else if (severityNumber >= 5 && severityNumber <= 8) {
    return 'DEBUG';
  } else if (severityNumber >= 9 && severityNumber <= 12) {
    return 'INFO';
  } else if (severityNumber >= 13 && severityNumber <= 16) {
    return 'WARN';
  } else if (severityNumber >= 17 && severityNumber <= 20) {
    return 'ERROR';
  } else if (severityNumber >= 21 && severityNumber <= 24) {
    return 'FATAL';
  } else {
    return 'INFO';
  }
}

export function getCallerInfo(frameDepth: number): {
  filePath?: string;
  lineNum?: number;
  caller?: string;
} {
  const stack = new Error().stack;
  if (!stack) return {};

  /*
  Structure looks like:
    Error
      at /iudex-node-module/test/express_instrumentation.test.ts:49:10
      at Layer.handle [as handle_request] (/Users/arnogau/.pnpm/express@4.19.2/layer.js:95:5)
      at Pino.write (/modules/.pnpm/pino@9.1.0/node_modules/pino/lib/proto.js:204:35)
  */
  const stackLines = stack.split('\n');
  const callerStackLine = stackLines[frameDepth + 1];

  const callerAndPathRegex =
    /at (?<caller>.+?) \((?<filePath>[^:()]+(?::[^:()]+)*):(?<lineNum>\d+):\d+\)/;
  const capMatch = callerStackLine.match(callerAndPathRegex);
  if (capMatch) {
    const { filePath, lineNum, caller } = capMatch.groups as Record<string, string>;
    return { filePath, lineNum: Number(lineNum), caller };
  }

  const pathOnlyRegex =
    /at (?<filePath>[^:()]+(?::[^:()]+)*):(?<lineNum>\d+):\d+/;
  const poMatch = callerStackLine.match(pathOnlyRegex);
  if (poMatch) {
    const { filePath, lineNum } = poMatch.groups as Record<string, string>;
    return { filePath, lineNum: Number(lineNum) };
  }

  return {};
}

/**
 * Flattens nested object keys into dot-separated strings.
 * e.g. {a.b.c: 1, a.d: 2, e: 3}
 */
export function flattenObject(
  obj?: Record<string, any>,
  parentKey = '',
  result: Record<string, any> = {},
  seen: Set<any> = new Set(),
  // Truncates after this many keys in an object
  maxObjectKeys = 30,
  // Truncates after this depth
  maxDepth = 4,
) {
  if (!obj) return;

  if (maxDepth < 0) {
    result[parentKey] = '<max depth exceeded>';
    return;
  }

  Object.entries(obj).forEach(([key, value], i) => {
    if (i === maxObjectKeys) {
      result[`${parentKey}.${key}._max_keys_exceeded`] = '<max keys exceeded>';
      return;
    }
    if (i > maxObjectKeys) {
      return;
    }
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (seen.has(value)) {
      result[newKey] = '<circular>';
      return;
    }
    if (typeof value === 'object' && value !== null && !Array.isArray(obj[key])) {
      seen.add(value);
      flattenObject(value, newKey, result, seen, maxObjectKeys, maxDepth - 1);
    } else {
      result[newKey] = value;
    }
  });

  return result;
}

/*
REGEX test cases
at getCallerInfo (/Users/username/.../instrumentation.ts:96:15)
at Object.<anonymous> (/Users/username/instrumentation.ts:21:1)
at /iudex-node-module/test/express_instrumentation.test.ts:49:10
at Layer.handle [as handle_request] (/Users/arnogau/.pnpm/express@4.19.2/layer.js:95:5)
at Layer.handle (/Users/arnogau/.pnpm/express@4.19.2/layer.js:95:5)
at <anonymous>:1:43
at f (<anonymous>:1:29)
at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
*/

export function emitOtelLog({
  level,
  body,
  severityNumber,
  attributes,
  stackDepth,
}: {
  level: string;
  body: any;
  severityNumber?: number;
  attributes?: Record<string, any>;
  stackDepth?: number,
}) {
  if (!config.isInstrumented) return;

  const attrs = { ...attributes };

  if (stackDepth != null) {
    const { filePath, lineNum, caller } = getCallerInfo(stackDepth + 1);
    Object.assign(attrs, {
      [SEMATTRS_CODE_FILEPATH]: filePath,
      [SEMATTRS_CODE_LINENO]: lineNum,
      [SEMATTRS_CODE_FUNCTION]: caller,
    });
  }

  // Get the baggage from the current context
  const baggage = propagation.getBaggage(context.active());

  // Extract the session ID from the baggage
  if (baggage) {
    const sessionId = baggage.getEntry('session.id')?.value;
    if (sessionId) {
      attrs['session.id'] = sessionId;
    }
  }

  // TODO: cache named logger
  const otelLogger = logs.getLogger('default');
  otelLogger.emit({
    severityNumber: severityNumber || convertSeverityTextToNumber(level.toUpperCase()),
    severityText: level.toUpperCase(),
    body,
    attributes: _.omitBy(attrs, _.isNil),
  });
}

