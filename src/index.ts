import OpenAI from 'openai';
import { FunctionJson } from 'function-json-schema';
export * from 'function-json-schema';

import { deconstructedPromise, poll, setTimeoutPromise } from './utils.js';
import { ChatFunctionReturn, ChatText, ChatTurn } from './types/chat-types.js';
import { createFunctionClient } from './clients/function-client.js';
import { createWorkflowClient } from './clients/workflow-client.js';
import { Task, TaskSequenced, TaskStatus, TaskStatusesToType } from './types/task-types.js';

export * from './clients/function-client.js';
export * from './clients/workflow-client.js';
export * from './clients/workflow-schemas.js';
export * from './types/task-types.js';
export * from './types/workflow-types.js';
export * from './types/chat-types.js';
export * from './instrumentation/index.js';

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

export function createClient(baseUrl: string, apiKey: string) {
  return {
    ...createFunctionClient(baseUrl, apiKey),
    ...createWorkflowClient(baseUrl, apiKey),
  };
}

/**
 * Iudex api client.
 */
export class Iudex {
  baseUrl: string;
  apiKey: string;
  maxTries: number;
  client: ReturnType<typeof createClient>;
  currentWorkflowId?: Promise<string>;

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
    this.client = createClient(this.baseUrl, this.apiKey);

    // Need it for generator function
    this.streamCurrentTask = this.streamCurrentTask.bind(this);
  }

  uploadFunctions = (
    jsons: Array<OpenAI.ChatCompletionCreateParams.Function | FunctionJson>,
    modules?: string,
  ): Promise<void> => {
    return this.client.putFunctionJsons(jsons, modules);
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
      modules?: string[],
    } = {},
  ): Promise<ChatText> => {
    const { onChatTurn, modules } = opts;
    const {
      promise: currentWorkflowId,
      resolve: setCurrentWorkflowId,
      reject: rejectCurrentWorkflowId,
    } = deconstructedPromise<string>();
    this.currentWorkflowId = currentWorkflowId;

    const userTurn: ChatText = {
      id: 'msg_ephemeral_' + new Date().toISOString(),
      type: 'text',
      sender: 'you',
      timestamp: new Date().toISOString(),
      text: message,
    };
    onChatTurn?.(userTurn);
    const { workflowId } = await this.client.startWorkflow(userTurn.text, modules)
      .catch(e => {
        rejectCurrentWorkflowId(e);
        throw e;
      });
    setCurrentWorkflowId(workflowId);

    let nextMessage = await poll(
      this.client.nextMessage,
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
      await this.client.returnFunctionCall(
        fnReturnTurn.functionCallId,
        fnReturnTurn.functionReturn,
      );

      nextMessage = await poll(
        this.client.nextMessage,
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
  sendMessage = async (
    message: string,
    opts: {
      onChatTurn?: (c: ChatTurn) => void,
      initAuth?: string,
      modules?: string[],
    } = {},
  ): Promise<string> => {
    const chatTurn = await this.sendChatTurn(message, opts);
    return chatTurn.text;
  };

  async *streamCurrentTask(): AsyncGenerator<Task> {
    if (!this.currentWorkflowId) {
      throw Error('No current workflow id. Send a message first.');
    }
    const workflowId = await this.currentWorkflowId;

    // Start from root
    let rootTask = await this.client.fetchGetWorkflowById({ workflowId }).then(r => r.workflow);
    // Get processing task
    let processingTask = getFirstTaskByStatus(rootTask, [
      'Pending',
      'Planning',
      'Executing',
      'Sequencing',
    ]);
    let oldProcessingTask: typeof processingTask;

    while (processingTask) {
      // Only yield when theres a new processing task
      if (oldProcessingTask?.id !== processingTask.id
        || oldProcessingTask?.status !== processingTask.status
      ) {
        yield processingTask;
        oldProcessingTask = processingTask;
      }
      // Wait
      await setTimeoutPromise(1000);
      // Fetch
      rootTask = await this.client.fetchGetWorkflowById({ workflowId }).then(r => r.workflow);
      // Error escape hatch
      const maybeErroredTask = getLastTaskByStatus(rootTask, 'Errored');
      if (maybeErroredTask) {
        yield maybeErroredTask;
        return;
      }
      // Set
      processingTask = getFirstTaskByStatus(rootTask, [
        'Pending',
        'Planning',
        'Executing',
        'Sequencing',
      ]);
    }

    // Get the resolved task
    const resolvedTask = getLastTaskByStatus(rootTask, 'Resolved');
    if (!resolvedTask) {
      throw Error('No processing nor resolved task found.');
    }
    yield resolvedTask;
    return;
  }

  // ======================= OpenAI interface shim ======================
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
        this.client.returnFunctionCall(callId, String(functionReturn));

      // Wait for new message
      const nextMessageRes = functionCallRes.then(() => poll(
        this.client.nextMessage,
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
    const {
      promise: currentWorkflowId,
      resolve: setCurrentWorkflowId,
      reject: rejectCurrentWorkflowId,
    } = deconstructedPromise<string>();
    this.currentWorkflowId = currentWorkflowId;
    const messageContent = extractMessageTextContent(lastMessage.content);
    return this.client.startWorkflow(messageContent)
      .then(({ workflowId }) => {
        setCurrentWorkflowId(workflowId);
        return poll(
          this.client.nextMessage,
          [workflowId],
          { maxTries: 60, tries: 0, waitMs: 1000 },
        ).then((r) => {
          return {
            model: body.model,
            ...mapIudexToOpenAi(r, workflowId),
          };
        });
      })
      .catch(e => {
        rejectCurrentWorkflowId(e);
        throw e;
      });
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

// ======================= Task traversal ======================
export function getLastTaskByStatus<Statuses extends TaskStatus | TaskStatus[]>(
  root: Task,
  status: Statuses,
): TaskStatusesToType<Statuses> | undefined {
  const arrayStatus = !Array.isArray(status) ? [status] : status;

  const traverse = reversePreOrderTraversal<Task>(
    t => (t as TaskSequenced).subtasks || [],
    t => (arrayStatus as TaskStatus[]).includes(t.status),
  );

  return traverse(root) as TaskStatusesToType<Statuses> | undefined;
}


export function getFirstTaskByStatus<S extends TaskStatus | TaskStatus[]>(
  root: Task,
  status: S | S[],
): TaskStatusesToType<S | S[]> | undefined {
  const arrayStatus = !Array.isArray(status) ? [status] : status;

  const traverse = preOrderTraversal<Task>(
    t => (t as TaskSequenced).subtasks || [],
    t => (arrayStatus as TaskStatus[]).includes(t.status),
  );

  return traverse(root) as TaskStatusesToType<S | S[]> | undefined;
}


export function reversePreOrderTraversal<T>(
  // Gets children from node
  getChildren: (node: T) => T[],
  // If true, stops traversal and returns value
  predicate: (node: T) => boolean,
) {
  return function traverse(node: T): T | undefined {
    if (predicate(node)) {
      return node;
    }

    const reversedChildren = getChildren(node).reverse();
    for (const child of reversedChildren) {
      const maybeFound = traverse(child);
      if (maybeFound !== undefined) {
        return maybeFound;
      }
    }

    return undefined;
  };
}

export function preOrderTraversal<T>(
  // Gets children from node
  getChildren: (node: T) => T[],
  // If true, stops traversal and returns value
  predicate: (node: T) => boolean,
) {
  return function traverse(node: T): T | undefined {
    if (predicate(node)) {
      return node;
    }

    const children = getChildren(node);
    for (const child of children) {
      const maybeFound = traverse(child);
      if (maybeFound !== undefined) {
        return maybeFound;
      }
    }

    return undefined;
  };
}
