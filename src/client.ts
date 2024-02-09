import { ChatFunctionCall, ChatText, ChatFunctionReturn } from './message.js';

function checkResponse(r: Response): Response {
  if (!r.ok) {
    throw Error(`Request ${r.url} failed with ${r.status}: ${r.statusText}`);
  }
  return r;
}

function throwOnApiError<T>(json: T): T {
  if (!json) {
    return json;
  }
  if ((json as any).message === 'Service Unavailable') {
    throw Error((json as any).message);
  }
  return json;
}

function unwrapApi(json: any): any {
  if (json && json.body && typeof json.body === 'string' && json.body.startsWith('{') && json.body.endsWith('}')) {
    return JSON.parse(json.body);
  }
  return json;
}

function parseIudexResponse(r: Response): Promise<any> {
  return checkResponse(r).json().then(throwOnApiError).then(unwrapApi).catch((e) => {
    throw Error(`Request ${r.url} failed with ${r.status}: ${e.message}`)
  });
}

export type ReturnFunctionCallBody = Pick<ChatFunctionReturn, 'functionCallId'|'functionReturn'>;
export type ReturnFunctionCallRes = { workflowId: string; message: string; };
export function returnFunctionCall(baseUrl: string, apiKey: string) {
  return function (functionCallId: string, functionReturn: any): Promise<void> {
    const bodyJson: ReturnFunctionCallBody = {
      functionCallId,
      functionReturn: JSON.stringify(functionReturn),
    };
    return fetch(baseUrl + '/function_calls/' + functionCallId + '/return', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(bodyJson),
    }).then(parseIudexResponse);
  };
}

export type NextMessageRes = ChatFunctionCall | ChatText | undefined;
export function nextMessage(baseUrl: string, apiKey: string) {
  return function (workflowId: string): Promise<NextMessageRes> {
    return fetch(baseUrl + '/workflows/' + workflowId + '/next_message', {
      method: 'GET',
      headers: { Authorization: `Bearer ${apiKey}` },
    }).then(parseIudexResponse);
  };
}

export type StartWorkflowRes = { workflowId: string; message: string; };
export function startWorkflow(baseUrl: string, apiKey: string) {
  return function (query: string, modules?: string): Promise<StartWorkflowRes> {
    return fetch(baseUrl + '/workflows', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ query, modules }),
    }).then(parseIudexResponse);
  };
}
