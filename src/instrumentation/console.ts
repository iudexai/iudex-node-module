import * as R from 'ramda';
import { emitOtelLog } from './utils.js';

export function instrumentConsole() {
  const { log, error, warn, info, debug } = console;
  ([
    { name: 'log', logger: log, level: 'INFO' },
    { name: 'error', logger: error, level: 'ERROR' },
    { name: 'warn', logger: warn, level: 'WARN' },
    { name: 'info', logger: info, level: 'INFO' },
    { name: 'debug', logger: debug, level: 'DEBUG'},
  ] as const).forEach(({ name, logger, level }) => {

    console[name] = function (...content: any[]) {
      logger(...content);
      const contentWoCtx = content
        .filter((c) => typeof c !== 'object' || !('ctx' in c || 'authCtx' in c));
      const contentCtx = R.mergeAll(content
        .filter((c) => typeof c === 'object' && ('ctx' in c || 'authCtx' in c))
        .map(c => {
          if (c.ctx) return c.ctx;
          if (c.authCtx) return c.authCtx;
          return {};
        }),
      );

      if (contentWoCtx.length === 1) {
        emitOtelLog({ level, body: contentWoCtx[0], attributes: contentCtx });
      } else {
        emitOtelLog({ level, body: contentWoCtx, attributes: contentCtx });
      }
    };
  });
}
