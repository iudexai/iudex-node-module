import { z } from 'zod';
declare const chatTurnBaseSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: string;
    sender: string;
    timestamp: string;
}, {
    id: string;
    type: string;
    sender: string;
    timestamp: string;
}>;
type ChatTurnBase = z.infer<typeof chatTurnBaseSchema>;
/**
 * For simple text responses
 */
export declare const chatTextSchema: z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"text">;
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "text";
    sender: string;
    timestamp: string;
    text: string;
}, {
    id: string;
    type: "text";
    sender: string;
    timestamp: string;
    text: string;
}>;
export type ChatText = z.infer<typeof chatTextSchema>;
export declare const chatErrorSchema: z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"error">;
    name: z.ZodString;
    message: z.ZodString;
    cause: z.ZodOptional<z.ZodString>;
    stack: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "error";
    sender: string;
    timestamp: string;
    message: string;
    name: string;
    cause?: string | undefined;
    stack?: string | undefined;
}, {
    id: string;
    type: "error";
    sender: string;
    timestamp: string;
    message: string;
    name: string;
    cause?: string | undefined;
    stack?: string | undefined;
}>;
export type ChatError = z.infer<typeof chatErrorSchema>;
/**
 * For image message.
 * Inspired by https://ogp.me/
 */
export declare const chatImageSchema: z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"image">;
    image: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "image";
    sender: string;
    timestamp: string;
    image: string;
    description: string;
}, {
    id: string;
    type: "image";
    sender: string;
    timestamp: string;
    image: string;
    description: string;
}>;
export type ChatImage = z.infer<typeof chatImageSchema>;
export declare const chatListSchema: z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"list">;
    list: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "list";
    sender: string;
    timestamp: string;
    list: string[];
}, {
    id: string;
    type: "list";
    sender: string;
    timestamp: string;
    list: string[];
}>;
export type ChatList = z.infer<typeof chatListSchema>;
export declare const chatFunctionCallSchema: z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"functionCall">;
    functionCallId: z.ZodString;
    functionName: z.ZodString;
    functionArgs: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "functionCall";
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionName: string;
    functionArgs: Record<string, unknown>;
}, {
    id: string;
    type: "functionCall";
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionName: string;
    functionArgs: Record<string, unknown>;
}>;
export type ChatFunctionCall = z.infer<typeof chatFunctionCallSchema>;
export declare const chatFunctionReturnSchema: z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"functionReturn">;
    functionCallId: z.ZodString;
    functionReturn: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "functionReturn";
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionReturn: string;
}, {
    id: string;
    type: "functionReturn";
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionReturn: string;
}>;
export type ChatFunctionReturn = z.infer<typeof chatFunctionReturnSchema>;
/**
 * All chat turn types. Put new chat turn types here.
 */
export declare const chatTurnSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"text">;
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "text";
    sender: string;
    timestamp: string;
    text: string;
}, {
    id: string;
    type: "text";
    sender: string;
    timestamp: string;
    text: string;
}>, z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"error">;
    name: z.ZodString;
    message: z.ZodString;
    cause: z.ZodOptional<z.ZodString>;
    stack: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "error";
    sender: string;
    timestamp: string;
    message: string;
    name: string;
    cause?: string | undefined;
    stack?: string | undefined;
}, {
    id: string;
    type: "error";
    sender: string;
    timestamp: string;
    message: string;
    name: string;
    cause?: string | undefined;
    stack?: string | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"image">;
    image: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "image";
    sender: string;
    timestamp: string;
    image: string;
    description: string;
}, {
    id: string;
    type: "image";
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
    id: string;
    type: "list";
    sender: string;
    timestamp: string;
    list: string[];
}, {
    id: string;
    type: "list";
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
    id: string;
    type: "functionCall";
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionName: string;
    functionArgs: Record<string, unknown>;
}, {
    id: string;
    type: "functionCall";
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
    id: string;
    type: "functionReturn";
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionReturn: string;
}, {
    id: string;
    type: "functionReturn";
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionReturn: string;
}>]>;
export type ChatTurn = z.infer<typeof chatTurnSchema>;
/**
 * String union for all chat turn types.
 */
export type ChatTurnType = ChatTurn['type'];
/**
 * ChatTurn base type with unioned type field. The most generic, "all" type.
 */
export type ChatTurnUnion = ChatTurnBase & {
    type: ChatTurnType;
};
export {};
