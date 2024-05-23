import * as R from 'ramda';

import {
  GetWorkflowsRes,
  GetWorkflowByIdReq,
  GetWorkflowByIdRes,
  PostWorkflowsReq,
  PostWorkflowsRes,
} from './workflow-schemas.js';

/**
 * Main client
 */
export function createWorkflowClient(baseUrl: string, apiKey: string) {
  const fns = {
    fetchGetWorkflows,
    fetchGetWorkflowById,
    fetchPostWorkflows,
  };
  return R.mapObjIndexed((fn) => fn(baseUrl, apiKey), fns) as MappedReturnType<
    typeof fns
  >;
}

export type WorkflowClient = ReturnType<typeof createWorkflowClient>;

async function checkResponseStatus(res: Response) {
  const body = await res.json();
  if (!res.ok) {
    // Unwrap error
    const error = body.error || res.statusText || body.message;
    throw new Error(`Request failed with: ${error}`);
  }
  return body;
}

export function fetchGetWorkflows(baseUrl: string, apiKey: string) {
  return function (): Promise<GetWorkflowsRes> {
    return fetch(`${baseUrl}/workflows`, {
      method: 'GET',
      headers: { 'x-api-key': apiKey },
    }).then(checkResponseStatus);
  };
}

export function fetchGetWorkflowById(baseUrl: string, apiKey: string) {
  return function (req: GetWorkflowByIdReq): Promise<GetWorkflowByIdRes> {
    return fetch(`${baseUrl}/workflows/${req.workflowId}`, {
      method: 'GET',
      headers: { 'x-api-key': apiKey },
    }).then(checkResponseStatus);
  };
}

export function fetchPostWorkflows(baseUrl: string, apiKey: string) {
  return function (req: PostWorkflowsReq): Promise<PostWorkflowsRes> {
    return fetch(`${baseUrl}/workflows`, {
      method: 'POST',
      body: JSON.stringify(req),
      headers: { 'x-api-key': apiKey },
    }).then(checkResponseStatus);
  };
}
