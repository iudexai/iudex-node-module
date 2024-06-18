import * as R from 'ramda';
import { ChatFunctionCall, ChatText, ChatFunctionReturn } from '../types/chat-types.js';
import { MappedReturnType } from '../types/utility-types.js';

function checkResponse(r: Response): Promise<unknown> {
  if (!r.ok) {
    throw Error(`Request ${r.url} failed with ${r.status}: ${r.statusText}`);
  }
  if (r.status === 204) {
    return Promise.resolve();
  }
  return r.json();
}

function throwOnApiError<T>(json: T): T {
  // Check service unavailable message
  if ((json as any)?.message === 'Service Unavailable') {
    throw Error((json as any).message);
  }
  // Pass through otherwise
  return json;
}

function unwrapApi(json: any): unknown {
  // If there is a body, return that instead
  if (json?.body
    && typeof json.body === 'string'
    && json.body.startsWith('{')
    && json.body.endsWith('}')
  ) {
    return JSON.parse(json.body);
  }
  return json;
}

function parseIudexResponse(r: Response): Promise<any> {
  return checkResponse(r)
    .then(throwOnApiError)
    .then(unwrapApi)
    .then(v => {
      if (process.env.DEBUG_MODE) {
        console.log(new Date().toISOString(), 'Response:', v);
      }
      return v;
    })
    .catch((e) => {
      throw Error(`Request ${r.url} failed with ${r.status}: ${e.message}`);
    });
}

export function createFunctionClient(baseUrl: string, apiKey: string) {
  const fns = {
    returnFunctionCall,
    nextMessage,
    startWorkflow,
    putFunctionJsons,
  };
  return R.mapObjIndexed((fn) => fn(baseUrl, apiKey), fns) as MappedReturnType<
    typeof fns
  >;
}

// TODO change to putFunctionCallReturn to better match api def name
export type ReturnFunctionCallBody = Pick<ChatFunctionReturn, 'functionCallId'|'functionReturn'>;
export type ReturnFunctionCallRes = { workflowId: string; message: string; };
export function returnFunctionCall(baseUrl: string, apiKey: string) {
  return function (functionCallId: string, functionReturn: string): Promise<void> {
    const bodyJson: ReturnFunctionCallBody = {
      functionCallId,
      functionReturn,
    };
    return fetch(baseUrl + '/function_calls/' + functionCallId + '/return', {
      method: 'PUT',
      headers: { 'x-api-key': `${apiKey}` },
      body: JSON.stringify(bodyJson),
    }).then(parseIudexResponse);
  };
}

export type NextMessageRes = ChatFunctionCall | ChatText | undefined;
export function nextMessage(baseUrl: string, apiKey: string) {
  return function (workflowId: string): Promise<NextMessageRes> {
    return fetch(baseUrl + '/workflows/' + workflowId + '/next_message', {
      method: 'GET',
      headers: { 'x-api-key': `${apiKey}` },
    }).then(parseIudexResponse);
  };
}

// TODO change to postWorkflows to better match api def name
export type StartWorkflowRes = { workflowId: string; message: string; };
export function startWorkflow(baseUrl: string, apiKey: string) {
  return function (query: string, modules?: string[]): Promise<StartWorkflowRes> {
    return fetch(baseUrl + '/workflows', {
      method: 'POST',
      headers: { 'x-api-key': `${apiKey}` },
      body: JSON.stringify({ query, modules }),
    }).then(parseIudexResponse);
  };
}


type FunctionJson = {
  name: string;
  description?: string;
  parameters?: Record<string, any>;
  returns?: Record<string, any>;
  usageExample?: string;
  returnsExample?: string;
};
export type putFunctionJsonsReq = { jsons: FunctionJson[]; module?: string; };
export function putFunctionJsons(baseUrl: string, apiKey: string) {
  return function (jsons: FunctionJson[], module?: string): Promise<void> {
    const bodyJson: putFunctionJsonsReq = { jsons, module };
    return fetch(baseUrl + '/function_jsons', {
      method: 'PUT',
      headers: { 'x-api-key': `${apiKey}` },
      body: JSON.stringify(bodyJson),
    }).then(parseIudexResponse);
  };
}
