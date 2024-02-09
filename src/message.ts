import { z } from 'zod';

const chatTurnBaseSchema = z.object({
  id: z.string(),
  type: z.string(),
  sender: z.string(),
  timestamp: z.string(),
});
type ChatTurnBase = z.infer<typeof chatTurnBaseSchema>;

/**
 * For simple text responses
 */
export const chatTextSchema = chatTurnBaseSchema.extend({
  type: z.literal('text'),
  text: z.string(),
});
export type ChatText = z.infer<typeof chatTextSchema>;

/**
 * For image message.
 * Inspired by https://ogp.me/
 */
export const chatImageSchema = chatTurnBaseSchema.extend({
  type: z.literal('image'),
  image: z.string(),
  description: z.string(),
});
export type ChatImage = z.infer<typeof chatImageSchema>;


export const chatListSchema = chatTurnBaseSchema.extend({
  type: z.literal('list'),
  list: z.array(z.string()),
});
export type ChatList = z.infer<typeof chatListSchema>;

// TODO: add more types for documents, graphs, etc

export const chatFunctionCallSchema = chatTurnBaseSchema.extend({
  type: z.literal('functionCall'),
  functionCallId: z.string(),
  functionName: z.string(),
  functionArgs: z.record(z.unknown()),
});
export type ChatFunctionCall = z.infer<typeof chatFunctionCallSchema>;


export const chatFunctionReturnSchema = chatTurnBaseSchema.extend({
  type: z.literal('functionReturn'),
  functionCallId: z.string(),
  functionReturn: z.string(),
});
export type ChatFunctionReturn = z.infer<typeof chatFunctionReturnSchema>;

/**
 * All chat turn types
 */
export const chatTurnSchema = z.discriminatedUnion('type', [
  chatTextSchema,
  chatImageSchema,
  chatListSchema,
  chatFunctionCallSchema,
  chatFunctionReturnSchema,
]);
export type ChatTurn = z.infer<typeof chatTurnSchema>;

/**
 * String union for all chat turn types
 */
export type ChatTurnType = ChatTurn['type'];

/**
 * ChatTurn base type with unioned type field. The most generic, "all" type.
 */
export type ChatTurnUnion = ChatTurnBase & { type: ChatTurnType };
