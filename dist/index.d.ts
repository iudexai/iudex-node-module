import OpenAI from 'openai';
import { FunctionJson } from 'function-json-schema';
export * from 'function-json-schema';
import { ChatText, ChatTurn } from './types/chat-types.js';
import { Task, TaskStatus, TaskStatusesToType } from './types/task-types.js';
export * from './clients/function-client.js';
export * from './clients/workflow-client.js';
export * from './clients/workflow-schemas.js';
export * from './types/task-types.js';
export * from './types/workflow-types.js';
export * from './types/chat-types.js';
export * from './instrumentation/index.js';
export declare const DEFAULT_BASE_URL = "https://api.iudex.ai";
export type IudexMessage = ChatTurn;
export type ChatCompletionMessageWithIudex = OpenAI.ChatCompletionMessageParam & ({
    tool_call_id?: string;
    workflowId?: string;
} | {
    tool_call_id: string;
    workflowId: string;
});
export type ChatCompletionWithIudex = OpenAI.ChatCompletion & {
    choices: Array<OpenAI.ChatCompletion.Choice & {
        message: OpenAI.ChatCompletionMessage & {
            workflowId: string;
        };
    }>;
};
export declare function createClient(baseUrl: string, apiKey: string): {
    fetchGetWorkflows: () => Promise<{
        workflowInfos: {
            status: "Running" | "Completed" | "Failed" | "Paused" | "TimedOut";
            description: string;
            workflowId: string;
            createdAt: string;
            updatedAt: string;
            numLeafTasks: number;
            modules?: string[] | undefined;
        }[];
    }>;
    fetchGetWorkflowById: (req: {
        workflowId: string;
    }) => Promise<{
        workflow: {
            id: string;
            status: "Pending";
            description: string;
            stepIndex: number;
            depth: number;
            numRewrites: number;
        } | {
            id: string;
            status: "Planning";
            description: string;
            stepIndex: number;
            depth: number;
            numRewrites: number;
            program?: string | undefined;
            feasibilityCheck?: {
                feasibility: "Feasible" | "Rewritable" | "Infeasible";
                reason: string;
                fix?: string | undefined;
            } | undefined;
            resolutionCheck?: {
                reason: string;
                resolution: "Resolved" | "Rewritable" | "Infeasible";
                fix?: string | undefined;
            } | undefined;
        } | {
            id: string;
            status: "Executing";
            description: string;
            stepIndex: number;
            depth: number;
            numRewrites: number;
            program: string;
            feasibilityCheck: {
                feasibility: "Feasible" | "Rewritable" | "Infeasible";
                reason: string;
                fix?: string | undefined;
            };
            usedFunctionNames: string[];
        } | {
            id: string;
            status: "Resolved";
            description: string;
            stepIndex: number;
            depth: number;
            numRewrites: number;
            program: string;
            feasibilityCheck: {
                feasibility: "Feasible" | "Rewritable" | "Infeasible";
                reason: string;
                fix?: string | undefined;
            };
            resolutionCheck: {
                reason: string;
                resolution: "Resolved" | "Rewritable" | "Infeasible";
                fix?: string | undefined;
            };
            usedFunctionNames: string[];
        } | {
            id: string;
            status: "Sequencing";
            description: string;
            stepIndex: number;
            depth: number;
            numRewrites: number;
            program: string;
            feasibilityCheck: {
                feasibility: "Feasible" | "Rewritable" | "Infeasible";
                reason: string;
                fix?: string | undefined;
            };
            usedFunctionNames?: string[] | undefined;
            resolutionCheck?: {
                reason: string;
                resolution: "Resolved" | "Rewritable" | "Infeasible";
                fix?: string | undefined;
            } | undefined;
        } | {
            id: string;
            status: "Errored";
            description: string;
            stepIndex: number;
            depth: number;
            numRewrites: number;
            errorMsg: string;
            errorName: string;
            errorStack?: string | undefined;
        } | ({
            id: string;
            status: "Pending" | "Planning" | "Executing" | "Sequencing" | "Resolved" | "Sequenced" | "Errored";
            description: string;
            stepIndex: number;
            depth: number;
            numRewrites: number;
        } & {
            status: "Sequenced";
            program: string;
            subtasks: Task[];
            feasibilityCheck: {
                feasibility: "Feasible" | "Rewritable" | "Infeasible";
                reason: string;
                fix?: string | undefined;
            };
            usedFunctionNames?: string[] | undefined;
            resolutionCheck?: {
                reason: string;
                resolution: "Resolved" | "Rewritable" | "Infeasible";
                fix?: string | undefined;
            } | undefined;
        });
    }>;
    fetchPostWorkflows: (req: {
        query: string;
        modules?: string[] | undefined;
        opts?: {
            maxFunctionMatches?: number | undefined;
        } | undefined;
    }) => Promise<{
        message: string;
        workflowId: string;
    }>;
    returnFunctionCall: (functionCallId: string, functionReturn: string) => Promise<void>;
    nextMessage: (workflowId: string) => Promise<import("./clients/function-client.js").NextMessageRes>;
    startWorkflow: (query: string, modules?: string[] | undefined) => Promise<import("./clients/function-client.js").StartWorkflowRes>;
    putFunctionJsons: (jsons: {
        name: string;
        description?: string | undefined;
        parameters?: Record<string, any> | undefined;
        returns?: Record<string, any> | undefined;
        usageExample?: string | undefined;
        returnsExample?: string | undefined;
    }[], module?: string | undefined) => Promise<void>;
};
/**
 * Iudex api client.
 */
export declare class Iudex {
    baseUrl: string;
    apiKey: string;
    maxTries: number;
    client: ReturnType<typeof createClient>;
    currentWorkflowId?: Promise<string>;
    functionLinker?: (fnName: string) => (...args: any[]) => unknown;
    constructor({ apiKey, baseUrl, maxTries, }?: {
        apiKey?: string;
        baseUrl?: string;
        maxTries?: number;
    });
    uploadFunctions: (jsons: Array<OpenAI.ChatCompletionCreateParams.Function | FunctionJson>, modules?: string) => Promise<void>;
    linkFunctions: (functionLinker: (fnName: string) => (...args: any[]) => unknown) => void;
    /**
     * @param message message to send
     * @returns response as a chat object
     */
    sendChatTurn: (message: string, opts?: {
        onChatTurn?: ((c: ChatTurn) => void) | undefined;
        initAuth?: string | undefined;
        modules?: string[] | undefined;
    }) => Promise<ChatText>;
    /**
     * @param message message to send
     * @returns response message as a string
     */
    sendMessage: (message: string, opts?: {
        onChatTurn?: ((c: ChatTurn) => void) | undefined;
        initAuth?: string | undefined;
        modules?: string[] | undefined;
    }) => Promise<string>;
    streamCurrentTask(): AsyncGenerator<Task>;
    chatCompletionsCreate: (body: OpenAI.ChatCompletionCreateParamsNonStreaming & {
        messages: Array<ChatCompletionMessageWithIudex>;
    }) => Promise<ChatCompletionWithIudex>;
    chat: {
        completions: {
            create: (body: OpenAI.ChatCompletionCreateParamsNonStreaming & {
                messages: Array<ChatCompletionMessageWithIudex>;
            }) => Promise<ChatCompletionWithIudex>;
        };
    };
}
/**
 * Maps IudexMessage to OpenAI.ChatCompletion.
 */
export declare function mapIudexToOpenAi(m: IudexMessage, workflowId: string): Omit<ChatCompletionWithIudex, 'model'>;
/**
 * Extracts OpenAI message content as a string.
 */
export declare function extractMessageTextContent(content: OpenAI.ChatCompletionUserMessageParam['content']): string;
export declare function getLastTaskByStatus<Statuses extends TaskStatus | TaskStatus[]>(root: Task, status: Statuses): TaskStatusesToType<Statuses> | undefined;
export declare function getFirstTaskByStatus<S extends TaskStatus | TaskStatus[]>(root: Task, status: S | S[]): TaskStatusesToType<S | S[]> | undefined;
export declare function reversePreOrderTraversal<T>(getChildren: (node: T) => T[], predicate: (node: T) => boolean): (node: T) => T | undefined;
export declare function preOrderTraversal<T>(getChildren: (node: T) => T[], predicate: (node: T) => boolean): (node: T) => T | undefined;
