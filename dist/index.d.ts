import OpenAI from 'openai';
import { z } from 'zod';

/**
 * For simple text responses
 */
declare const chatTextSchema: z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"text">;
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "text";
    id: string;
    sender: string;
    timestamp: string;
    text: string;
}, {
    type: "text";
    id: string;
    sender: string;
    timestamp: string;
    text: string;
}>;
type ChatText = z.infer<typeof chatTextSchema>;
declare const chatFunctionCallSchema: z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"functionCall">;
    functionCallId: z.ZodString;
    functionName: z.ZodString;
    functionArgs: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    type: "functionCall";
    id: string;
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionName: string;
    functionArgs: Record<string, unknown>;
}, {
    type: "functionCall";
    id: string;
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionName: string;
    functionArgs: Record<string, unknown>;
}>;
type ChatFunctionCall = z.infer<typeof chatFunctionCallSchema>;
declare const chatFunctionReturnSchema: z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"functionReturn">;
    functionCallId: z.ZodString;
    functionReturn: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "functionReturn";
    id: string;
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionReturn: string;
}, {
    type: "functionReturn";
    id: string;
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionReturn: string;
}>;
type ChatFunctionReturn = z.infer<typeof chatFunctionReturnSchema>;
/**
 * All chat turn types
 */
declare const chatTurnSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"text">;
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "text";
    id: string;
    sender: string;
    timestamp: string;
    text: string;
}, {
    type: "text";
    id: string;
    sender: string;
    timestamp: string;
    text: string;
}>, z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"image">;
    image: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "image";
    id: string;
    sender: string;
    timestamp: string;
    image: string;
    description: string;
}, {
    type: "image";
    id: string;
    sender: string;
    timestamp: string;
    image: string;
    description: string;
}>, z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"list">;
    list: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    type: "list";
    id: string;
    sender: string;
    timestamp: string;
    list: string[];
}, {
    type: "list";
    id: string;
    sender: string;
    timestamp: string;
    list: string[];
}>, z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"functionCall">;
    functionCallId: z.ZodString;
    functionName: z.ZodString;
    functionArgs: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    type: "functionCall";
    id: string;
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionName: string;
    functionArgs: Record<string, unknown>;
}, {
    type: "functionCall";
    id: string;
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionName: string;
    functionArgs: Record<string, unknown>;
}>, z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"functionReturn">;
    functionCallId: z.ZodString;
    functionReturn: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "functionReturn";
    id: string;
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionReturn: string;
}, {
    type: "functionReturn";
    id: string;
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionReturn: string;
}>]>;
type ChatTurn = z.infer<typeof chatTurnSchema>;

type ReturnFunctionCallBody = Pick<ChatFunctionReturn, 'functionCallId' | 'functionReturn'>;
type ReturnFunctionCallRes = {
    workflowId: string;
    message: string;
};
declare function returnFunctionCall(baseUrl: string, apiKey: string): (functionCallId: string, functionReturn: any) => Promise<void>;
type NextMessageRes = ChatFunctionCall | ChatText | undefined;
declare function nextMessage(baseUrl: string, apiKey: string): (workflowId: string) => Promise<NextMessageRes>;
type StartWorkflowRes = {
    workflowId: string;
    message: string;
};
declare function startWorkflow(baseUrl: string, apiKey: string): (query: string, modules?: string) => Promise<StartWorkflowRes>;
type FunctionJson = {
    name: string;
    description?: string;
    parameters?: Record<string, any>;
    returns?: Record<string, any>;
    usageExample?: string;
    returnsExample?: string;
};
type putFunctionJsonsReq = {
    jsons: FunctionJson[];
    module?: string;
};
declare function putFunctionJsons(baseUrl: string, apiKey: string): (jsons: FunctionJson[], module?: string) => Promise<void>;

declare const DEFAULT_BASE_URL = "https://5pz08znmzj.execute-api.us-west-2.amazonaws.com";
type IudexMessage = ChatTurn;
type ChatCompletionMessageWithIudex = OpenAI.ChatCompletionMessageParam & ({
    tool_call_id?: string;
    workflowId?: string;
} | {
    tool_call_id: string;
    workflowId: string;
});
type ChatCompletionWithIudex = OpenAI.ChatCompletion & {
    choices: Array<OpenAI.ChatCompletion.Choice & {
        message: OpenAI.ChatCompletionMessage & {
            workflowId: string;
        };
    }>;
};
/**
 * Iudex api client.
 */
declare class Iudex {
    baseUrl: string;
    apiKey: string;
    constructor({ apiKey, baseUrl, }?: {
        apiKey?: string;
        baseUrl?: string;
    });
    uploadFunctions: (jsons: Array<OpenAI.ChatCompletionCreateParams.Function>, modules?: string) => Promise<void>;
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
declare function mapIudexToOpenAi(m: IudexMessage, workflowId: string): Omit<ChatCompletionWithIudex, 'model'>;
/**
 * Extracts OpenAI message content as a string.
 */
declare function extractMessageTextContent(content: OpenAI.ChatCompletionUserMessageParam['content']): string;

export { type ChatCompletionMessageWithIudex, type ChatCompletionWithIudex, DEFAULT_BASE_URL, Iudex, type IudexMessage, type NextMessageRes, type ReturnFunctionCallBody, type ReturnFunctionCallRes, type StartWorkflowRes, Iudex as default, extractMessageTextContent, mapIudexToOpenAi, nextMessage, putFunctionJsons, type putFunctionJsonsReq, returnFunctionCall, startWorkflow };
