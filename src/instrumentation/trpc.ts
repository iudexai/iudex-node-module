import { IncomingMessage, ServerResponse } from 'http';

export const config = {
  trpcBasePath: '/trpc',
};

export function isTrpcRequest(req: IncomingMessage): boolean {
  const url = (req as any).originalUrl || req.url;
  return url && url.startsWith(config.trpcBasePath);
}

/**
 * Extracts inputs from a TRPC request. Similar to TRPC's parse req
 * https://github.com/trpc/trpc/blob/84bfa8b8206570d35e1cb3a75be97d1eb3bc8aa2/packages/server/src/unstable-core-do-not-import/http/contentType.ts#L67
 * Doesnt throw if input object structure is mangled
 */
export function extractTrpcReqInputs(req: IncomingMessage): Record<string, any> {
  const { url } = req;
  if (!url) {
    return {};
  }
  /* If GET, use search params */
  if (req.method === 'GET') {
    const [, inputStr] = url.split('?', 2);
    const searchParams = new URLSearchParams(inputStr);
    const queryInput = searchParams.get('input');
    const inputs = (queryInput ? JSON.parse(queryInput) : {}) || {};
    return isObject(inputs) ? inputs : { 0: inputs };
  }

  /* Else, use body */
  // Pray that some middleware moved the POST body into req.body as a JSON object
  // Express and fastify do this, for example
  const inputs = (req as any).body;
  return isObject(inputs) ? inputs : { 0: inputs };
}

/**
 * Creates a loggable message for a TRPC request
 */
export function trpcReqMessage(req: IncomingMessage, res?: ServerResponse): string {
  const { url } = req;
  if (!url) {
    return 'Iudex Error: Missing URL in TRPC request';
  }
  // pathsStr looks like /userById,userList
  const [pathsStr] = url.split('?', 2);
  // paths look like ['userById', 'userList']
  const paths = pathsStr.slice(1).split(',');
  // inputs is an object with keys 0, 1, ... for each path if it exists
  const inputs = extractTrpcReqInputs(req);

  const calls = paths.map((path, idx)  => {
    return {
      path,
      input: inputs[idx] as Record<string, any> | undefined,
    };
  });

  return `TRPC:\n` +
    `${calls.map(call => {
      // TODO add call output
      return `  ${call.path}${call.input ? ` (${jsonStrOrEmpty(call.input)})` : ''}`;
    }).join('\n')}`
  ;
}

export const iudexTrpc = {
  config,
  isTrpcRequest,
  extractTrpcReqInputs,
  trpcReqMessage,
};

// Utilities

function jsonStrOrEmpty(obj: Record<string, any> | undefined): string {
  return obj ? JSON.stringify(obj, null, 4) : '';
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && !Array.isArray(value) && typeof value === 'object';
}
