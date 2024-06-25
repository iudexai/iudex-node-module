import {
  InstrumentationBase,
  InstrumentationNodeModuleDefinition,
  safeExecuteInTheMiddle,
} from '@opentelemetry/instrumentation';
import { InstrumentationConfig } from '@opentelemetry/instrumentation';
// import { PACKAGE_NAME, PACKAGE_VERSION } from './version';

import { iudexTrpc } from './trpc.js';
import { IncomingMessage, ServerResponse } from 'http';

export const options = {
  customSuccessMessage: (req: IncomingMessage, res: ServerResponse) => {
    // Better TRPC logging for pino-http
    if (iudexTrpc.isTrpcRequest(req)) {
      try {
        return iudexTrpc.trpcReqMessage(req, res);
      } catch { /* Ignore */}
    }
    // Copied from pino-http
    return !req.readableAborted && res.writableEnded ? 'request completed' : 'request aborted';
  },
};

export const iudexPinoHttp = {
  options,
};


export interface PinoHttpInstrumentationConfig extends InstrumentationConfig {
}


/**
 * @deprecated Experimental, don't use
 */
export class PinoHttpInstrumentation extends InstrumentationBase {
  constructor(config: PinoHttpInstrumentationConfig = {}) {
    super('pino-http', '1.0.0', config);
  }
  protected init() {
    return new InstrumentationNodeModuleDefinition('pino-http', ['*'], module => {
      const isESM = module[Symbol.toStringTag] === 'Module';
      const moduleExports = isESM ? module.default : module;
      const patchedPinoHttp = Object.assign((...args: unknown[]) => {
        if (args.length === 0) {
          return moduleExports(options);
        }

        if (args.length === 1) {
          const optsOrStream = args[0] as any;
          // Is stream
          if (typeof optsOrStream?.write === 'function') {
            return moduleExports(options, optsOrStream);
          }
          // Is config object
          if (typeof optsOrStream === 'object') {
            return moduleExports({ ...options, ...optsOrStream });
          }
        }

        const opts = args[0] as any;
        args[0] = { ...options, ...opts };
        return moduleExports(...args);
      }, moduleExports);

      if (typeof patchedPinoHttp.pinoHttp === 'function') {
        patchedPinoHttp.pinoHttp = patchedPinoHttp;
      }
      if (typeof patchedPinoHttp.default === 'function') {
        patchedPinoHttp.default = patchedPinoHttp;
      }
      if (isESM) {
        module.pinoHttp = patchedPinoHttp;
        module.default = patchedPinoHttp;
      }

      return patchedPinoHttp;
    });
  }
}