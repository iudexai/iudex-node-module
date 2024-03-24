import OpenAI from 'openai';
import { ChatFunctionReturn, ChatText, ChatTurn } from './message.js';
import * as client from './client.js';
export * from './client.js';
import { poll } from './utils.js';
import { FunctionJson } from './function-types.js';
export * from './function-types.js';

export const DEFAULT_BASE_URL = 'https://api.iudex.ai';

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
    message: OpenAI.ChatCompletionMessage & { workflowId: string; };
  }>
};

/**
 * Iudex api client.
 */
export class Iudex {
  baseUrl: string;
  apiKey: string;
  maxTries: number;
  functionLinker?: (fnName: string) => (...args: any[]) => unknown;

  constructor({
    apiKey = process.env.IUDEX_API_KEY,
    baseUrl = process.env.IUDEX_BASE_URL || DEFAULT_BASE_URL,
    maxTries = process.env.IUDEX_MAX_TRIES ? parseInt(process.env.IUDEX_MAX_TRIES) : 60,
  }: {
    apiKey?: string;
    baseUrl?: string;
    maxTries?: number;
  } = {}) {
    if (!apiKey) {
      throw Error(
        `The IUDEX_API_KEY environment variable is missing or empty.` +
        ` Provide IUDEX_API_KEY to the environment on load` +
        ` OR instantiate the Iudex client with the apiKey option.` +
        ` Example: \`new Iudex({ apiKey: 'My API Key' })\``,
      );
    }
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.maxTries = maxTries;
  }

  uploadFunctions = (
    jsons: Array<OpenAI.ChatCompletionCreateParams.Function | FunctionJson>,
    modules?: string,
  ): Promise<void> => {
    return client.putFunctionJsons(this.baseUrl, this.apiKey)(jsons, modules);
  };

  linkFunctions = (functionLinker: (fnName: string) => (...args: any[]) => unknown): void => {
    this.functionLinker = functionLinker;
  };

  /**
   * @param message message to send
   * @returns response as a chat object
   */
  sendChatTurn = async (
    message: string,
    opts: {
      onChatTurn?: (c: ChatTurn) => void,
      initAuth?: string,
    } = {},
  ): Promise<ChatText> => {
    const { onChatTurn } = opts;

    const userTurn: ChatText = {
      id: 'msg_ephemeral_' + new Date().toISOString(),
      type: 'text',
      sender: 'you',
      timestamp: new Date().toISOString(),
      text: message,
    };
    onChatTurn?.(userTurn);
    const { workflowId } = await client.startWorkflow(this.baseUrl, this.apiKey)(userTurn.text);

    let nextMessage = await poll(
      client.nextMessage(this.baseUrl, this.apiKey),
      [workflowId],
      { maxTries: 60, tries: 0, waitMs: 1000 },
    );
    onChatTurn?.(nextMessage);

    while (nextMessage.type === 'functionCall') {
      if (!this.functionLinker) {
        throw Error(
          'Establish a way to call functions using `.linkFunctions` before' +
          ' sending a message that might require your functions to answer.',
        );
      }
      const fn = this.functionLinker(nextMessage.functionName);
      const fnReturn = await fn(nextMessage.functionArgs);

      const fnReturnTurn: ChatFunctionReturn = {
        id: 'msg_ephemeral_' + new Date().toISOString(),
        type: 'functionReturn',
        sender: nextMessage.functionName,
        timestamp: new Date().toISOString(),
        functionCallId: nextMessage.functionCallId,
        functionReturn: JSON.stringify(fnReturn),
      };
      onChatTurn?.(fnReturnTurn);
      await client.returnFunctionCall(this.baseUrl, this.apiKey)(
        fnReturnTurn.functionCallId,
        fnReturnTurn.functionReturn,
      );

      nextMessage = await poll(
        client.nextMessage(this.baseUrl, this.apiKey),
        [workflowId],
        { maxTries: 60, tries: 0, waitMs: 1000 },
      );
      onChatTurn?.(nextMessage);
    }

    return nextMessage;
  };

  /**
   * @param message message to send
   * @returns response message as a string
   */
  sendMessage = async (message: string): Promise<string> => {
    const chatTurn = await this.sendChatTurn(message);
    return chatTurn.text;
  };

  // OpenAI interface shim
  chatCompletionsCreate = (body: OpenAI.ChatCompletionCreateParamsNonStreaming & {
    messages: Array<ChatCompletionMessageWithIudex>
  }): Promise<ChatCompletionWithIudex>  => {
    const lastMessage = body.messages[body.messages.length - 1];
    if (!lastMessage) {
      throw Error(`The messages array is empty.`);
    }

    // Expecting the last message to be the function result or a new query.
    // So, the second to last message is the previous Iudex message with
    // the function to call + callId or is undefined.
    const penUltMessage = body.messages[body.messages.length - 2];

    // If there is a tool_call_id, we use it to continue the execution in Iudex
    if (lastMessage?.tool_call_id && penUltMessage?.workflowId) {
      const workflowId = penUltMessage.workflowId;
      const callId = lastMessage.tool_call_id;
      const functionReturn = lastMessage.content || '';

      // Put data
      const functionCallRes =
        client.returnFunctionCall(this.baseUrl, this.apiKey)(callId, String(functionReturn));

      // Wait for new message
      const nextMessageRes = functionCallRes.then(() => poll(
        client.nextMessage(this.baseUrl, this.apiKey),
        [workflowId],
        { maxTries: 60, tries: 0, waitMs: 1000 },
      ));

      // Return result as OpenAI.ChatCompletion
      return nextMessageRes.then((r) => {
        return {
          model: body.model,
          ...mapIudexToOpenAi(r, workflowId),
        };
      });
    }

    if (!lastMessage.content) {
      throw Error(`The message content is empty.`);
    }

    // Else create new workflow
    const messageContent = extractMessageTextContent(lastMessage.content);
    return client.startWorkflow(this.baseUrl, this.apiKey)(messageContent)
      .then(({ workflowId }) =>
        poll(
          client.nextMessage(this.baseUrl, this.apiKey),
          [workflowId],
          { maxTries: 60, tries: 0, waitMs: 1000 },
        )
          .then((r) => {
            return {
              model: body.model,
              ...mapIudexToOpenAi(r, workflowId),
            };
          }),
      );
  };

  chat = {
    completions: {
      create: this.chatCompletionsCreate,
    },
  };
}

/**
 * Maps IudexMessage to OpenAI.ChatCompletion.
 */
export function mapIudexToOpenAi(
  m: IudexMessage,
  workflowId: string,
): Omit<ChatCompletionWithIudex, 'model'> {
  // If the result is a function_call, we return the function call
  if (m.type === 'functionCall') {
    const message = {
      content: null,
      role: 'assistant' as const,
      tool_calls: [{
        id: m.functionCallId,
        function: { name: m.functionName, arguments: JSON.stringify(m.functionArgs) },
        type: 'function' as const,
      }],
      workflowId,
    };
    return {
      id: m.id,
      choices: [{
        index: 0,
        finish_reason: 'tool_calls',
        logprobs: null,
        message,
      }],
      created: new Date(m.timestamp).valueOf(),
      object: 'chat.completion',
    };
  }

  // Else assume it's the final result
  if (m.type === 'text') {
    const message = {
      content: m.text,
      role: 'assistant' as const,
      workflowId,
    };
    return {
      id: m.id,
      choices: [{
        index: 0,
        finish_reason: 'stop',
        logprobs: null,
        message,
      }],
      created: new Date(m.timestamp).valueOf(),
      object: 'chat.completion',
    };
  }

  throw Error('Unsupported message type: ' + m.type);
}

/**
 * Extracts OpenAI message content as a string.
 */
export function extractMessageTextContent(
  content: OpenAI.ChatCompletionUserMessageParam['content'],
): string {
  if (typeof content === 'string') {
    return content;
  }
  // Else content is array containing PartImage or PartText
  return content.map(c => c.type === 'text' ? c.text : '').join('');
}

export default Iudex;
