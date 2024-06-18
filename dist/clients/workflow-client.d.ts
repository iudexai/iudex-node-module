import { GetWorkflowsRes, GetWorkflowByIdReq, GetWorkflowByIdRes, PostWorkflowsReq, PostWorkflowsRes } from './workflow-schemas.js';
import { MappedReturnType } from '../types/utility-types.js';
/**
 * Main client
 */
export declare function createWorkflowClient(baseUrl: string, apiKey: string): MappedReturnType<{
    fetchGetWorkflows: typeof fetchGetWorkflows;
    fetchGetWorkflowById: typeof fetchGetWorkflowById;
    fetchPostWorkflows: typeof fetchPostWorkflows;
}>;
export type WorkflowClient = ReturnType<typeof createWorkflowClient>;
export declare function fetchGetWorkflows(baseUrl: string, apiKey: string): () => Promise<GetWorkflowsRes>;
export declare function fetchGetWorkflowById(baseUrl: string, apiKey: string): (req: GetWorkflowByIdReq) => Promise<GetWorkflowByIdRes>;
export declare function fetchPostWorkflows(baseUrl: string, apiKey: string): (req: PostWorkflowsReq) => Promise<PostWorkflowsRes>;
