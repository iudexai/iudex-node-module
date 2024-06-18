import { ChatFunctionCall, ChatText, ChatFunctionReturn } from '../types/chat-types.js';
import { MappedReturnType } from '../types/utility-types.js';
export declare function createFunctionClient(baseUrl: string, apiKey: string): MappedReturnType<{
    returnFunctionCall: typeof returnFunctionCall;
    nextMessage: typeof nextMessage;
    startWorkflow: typeof startWorkflow;
    putFunctionJsons: typeof putFunctionJsons;
}>;
export type ReturnFunctionCallBody = Pick<ChatFunctionReturn, 'functionCallId' | 'functionReturn'>;
export type ReturnFunctionCallRes = {
    workflowId: string;
    message: string;
};
export declare function returnFunctionCall(baseUrl: string, apiKey: string): (functionCallId: string, functionReturn: string) => Promise<void>;
export type NextMessageRes = ChatFunctionCall | ChatText | undefined;
export declare function nextMessage(baseUrl: string, apiKey: string): (workflowId: string) => Promise<NextMessageRes>;
export type StartWorkflowRes = {
    workflowId: string;
    message: string;
};
export declare function startWorkflow(baseUrl: string, apiKey: string): (query: string, modules?: string[]) => Promise<StartWorkflowRes>;
type FunctionJson = {
    name: string;
    description?: string;
    parameters?: Record<string, any>;
    returns?: Record<string, any>;
    usageExample?: string;
    returnsExample?: string;
};
export type putFunctionJsonsReq = {
    jsons: FunctionJson[];
    module?: string;
};
export declare function putFunctionJsons(baseUrl: string, apiKey: string): (jsons: FunctionJson[], module?: string) => Promise<void>;
export {};
