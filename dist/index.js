"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  DEFAULT_BASE_URL: () => DEFAULT_BASE_URL,
  Iudex: () => Iudex,
  default: () => src_default,
  extractMessageTextContent: () => extractMessageTextContent,
  functionJsonSchema: () => functionJsonSchema,
  mapIudexToOpenAi: () => mapIudexToOpenAi,
  nextMessage: () => nextMessage,
  nullFunctionJson: () => nullFunctionJson,
  putFunctionJsons: () => putFunctionJsons,
  returnFunctionCall: () => returnFunctionCall,
  startWorkflow: () => startWorkflow
});
module.exports = __toCommonJS(src_exports);

// src/client.ts
function checkResponse(r) {
  if (!r.ok) {
    throw Error(`Request ${r.url} failed with ${r.status}: ${r.statusText}`);
  }
  if (r.status === 204) {
    return Promise.resolve();
  }
  return r.json();
}
function throwOnApiError(json) {
  if (json?.message === "Service Unavailable") {
    throw Error(json.message);
  }
  return json;
}
function unwrapApi(json) {
  if (json?.body && typeof json.body === "string" && json.body.startsWith("{") && json.body.endsWith("}")) {
    return JSON.parse(json.body);
  }
  return json;
}
function parseIudexResponse(r) {
  return checkResponse(r).then(throwOnApiError).then(unwrapApi).catch((e) => {
    throw Error(`Request ${r.url} failed with ${r.status}: ${e.message}`);
  });
}
function returnFunctionCall(baseUrl, apiKey) {
  return function(functionCallId, functionReturn) {
    const bodyJson = {
      functionCallId,
      functionReturn
    };
    return fetch(baseUrl + "/function_calls/" + functionCallId + "/return", {
      method: "PUT",
      headers: { "x-api-key": `${apiKey}` },
      body: JSON.stringify(bodyJson)
    }).then(parseIudexResponse);
  };
}
function nextMessage(baseUrl, apiKey) {
  return function(workflowId) {
    return fetch(baseUrl + "/workflows/" + workflowId + "/next_message", {
      method: "GET",
      headers: { "x-api-key": `${apiKey}` }
    }).then(parseIudexResponse);
  };
}
function startWorkflow(baseUrl, apiKey) {
  return function(query, modules) {
    return fetch(baseUrl + "/workflows", {
      method: "POST",
      headers: { "x-api-key": `${apiKey}` },
      body: JSON.stringify({ query, modules })
    }).then(parseIudexResponse);
  };
}
function putFunctionJsons(baseUrl, apiKey) {
  return function(jsons, module2) {
    const bodyJson = { jsons, module: module2 };
    return fetch(baseUrl + "/function_jsons", {
      method: "PUT",
      headers: { "x-api-key": `${apiKey}` },
      body: JSON.stringify(bodyJson)
    }).then(parseIudexResponse);
  };
}

// src/utils.ts
function setTimeoutPromise(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function poll(fn, args, {
  maxTries,
  tries,
  waitMs
} = { maxTries: 300, tries: 0, waitMs: 1e3 }) {
  if (tries >= maxTries) {
    throw Error(
      `Polling failed after ${maxTries} tries for function ${fn.name}.`
    );
  }
  return fn(...args).then((res) => {
    if (res == null) {
      return setTimeoutPromise(waitMs).then(() => poll(fn, args, { maxTries, tries: tries + 1, waitMs }));
    }
    return res;
  });
}

// src/function-types.ts
var import_zod = require("zod");
var objectJsonSchema = import_zod.z.object({
  type: import_zod.z.literal("object"),
  properties: import_zod.z.record(import_zod.z.lazy(() => valueJsonSchema)),
  description: import_zod.z.string().optional(),
  required: import_zod.z.array(import_zod.z.string()).optional()
});
var recordJsonSchema = import_zod.z.object({
  type: import_zod.z.literal("object"),
  additionalProperties: import_zod.z.lazy(() => valueJsonSchema),
  description: import_zod.z.string().optional()
});
var arrayJsonSchema = import_zod.z.object({
  type: import_zod.z.literal("array"),
  items: import_zod.z.lazy(() => valueJsonSchema),
  description: import_zod.z.string().optional()
});
var tupleJsonSchema = import_zod.z.object({
  type: import_zod.z.literal("array"),
  prefixItems: import_zod.z.array(import_zod.z.string()),
  description: import_zod.z.string().optional()
});
var stringJsonSchema = import_zod.z.object({
  type: import_zod.z.literal("string"),
  enum: import_zod.z.array(import_zod.z.string()).optional(),
  description: import_zod.z.string().optional()
});
var numberJsonSchema = import_zod.z.object({
  type: import_zod.z.union([import_zod.z.literal("number"), import_zod.z.literal("integer")]),
  description: import_zod.z.string().optional(),
  minimum: import_zod.z.number().optional(),
  maximum: import_zod.z.number().optional()
});
var booleanJsonSchema = import_zod.z.object({
  type: import_zod.z.literal("boolean"),
  description: import_zod.z.string().optional()
});
var unionJsonSchema = import_zod.z.object({
  type: import_zod.z.array(import_zod.z.string()),
  description: import_zod.z.string().optional()
});
var realUnionJsonSchema = import_zod.z.object({
  anyOf: import_zod.z.array(import_zod.z.lazy(() => valueJsonSchema)),
  description: import_zod.z.string().optional()
});
var unknownJsonSchema = import_zod.z.object({
  type: import_zod.z.literal("unknown"),
  description: import_zod.z.string().optional()
});
var nullJsonSchema = import_zod.z.object({
  type: import_zod.z.literal("null"),
  description: import_zod.z.string().optional()
});
var refJsonSchema = import_zod.z.object({
  $ref: import_zod.z.string(),
  description: import_zod.z.string().optional()
});
var valueJsonSchema = import_zod.z.union([
  objectJsonSchema,
  recordJsonSchema,
  arrayJsonSchema,
  tupleJsonSchema,
  stringJsonSchema,
  numberJsonSchema,
  booleanJsonSchema,
  unionJsonSchema,
  realUnionJsonSchema,
  unknownJsonSchema,
  nullJsonSchema,
  refJsonSchema
]);
var functionJsonSchema = import_zod.z.object({
  name: import_zod.z.string(),
  description: import_zod.z.string(),
  parameters: import_zod.z.union([
    import_zod.z.object({
      type: import_zod.z.literal("object"),
      properties: import_zod.z.record(valueJsonSchema),
      description: import_zod.z.string().optional(),
      required: import_zod.z.array(import_zod.z.string()).optional()
    }),
    import_zod.z.array(valueJsonSchema)
  ]),
  returns: valueJsonSchema,
  usageExample: import_zod.z.string().optional(),
  returnsExample: import_zod.z.string().optional()
});
var nullFunctionJson = {
  name: "",
  description: "",
  parameters: [],
  returns: { type: "null" }
};

// src/index.ts
var DEFAULT_BASE_URL = "https://api.iudex.ai";
var Iudex = class {
  baseUrl;
  apiKey;
  functionLinker;
  constructor({
    apiKey = process.env.IUDEX_API_KEY,
    baseUrl = process.env.IUDEX_BASE_URL || DEFAULT_BASE_URL
  } = {
    apiKey: process.env.IUDEX_API_KEY,
    baseUrl: DEFAULT_BASE_URL
  }) {
    if (!apiKey) {
      throw Error(
        `The IUDEX_API_KEY environment variable is missing or empty. Provide IUDEX_API_KEY to the environment on load OR instantiate the Iudex client with the apiKey option. Example: \`new Iudex({ apiKey: 'My API Key' })\``
      );
    }
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }
  uploadFunctions = (jsons, modules) => {
    return putFunctionJsons(this.baseUrl, this.apiKey)(jsons, modules);
  };
  linkFunctions = (functionLinker) => {
    this.functionLinker = functionLinker;
  };
  /**
   * @param message message to send
   * @returns response as a chat object
   */
  sendChatTurn = async (message, opts = {}) => {
    const { onChatTurn } = opts;
    const userTurn = {
      id: "msg_ephemeral_" + (/* @__PURE__ */ new Date()).toISOString(),
      type: "text",
      sender: "you",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      text: message
    };
    onChatTurn?.(userTurn);
    const { workflowId } = await startWorkflow(this.baseUrl, this.apiKey)(userTurn.text);
    let nextMessage2 = await poll(nextMessage(this.baseUrl, this.apiKey), [workflowId]);
    onChatTurn?.(nextMessage2);
    while (nextMessage2.type === "functionCall") {
      if (!this.functionLinker) {
        throw Error(
          "Establish a way to call functions using `.linkFunctions` before sending a message that might require your functions to answer."
        );
      }
      const fn = this.functionLinker(nextMessage2.functionName);
      const fnReturn = await fn(nextMessage2.functionArgs);
      const fnReturnTurn = {
        id: "msg_ephemeral_" + (/* @__PURE__ */ new Date()).toISOString(),
        type: "functionReturn",
        sender: nextMessage2.functionName,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        functionCallId: nextMessage2.functionCallId,
        functionReturn: JSON.stringify(fnReturn)
      };
      onChatTurn?.(fnReturnTurn);
      await returnFunctionCall(this.baseUrl, this.apiKey)(
        fnReturnTurn.functionCallId,
        fnReturnTurn.functionReturn
      );
      nextMessage2 = await poll(nextMessage(this.baseUrl, this.apiKey), [workflowId]);
      onChatTurn?.(nextMessage2);
    }
    return nextMessage2;
  };
  /**
   * @param message message to send
   * @returns response message as a string
   */
  sendMessage = async (message) => {
    const chatTurn = await this.sendChatTurn(message);
    return chatTurn.text;
  };
  // OpenAI interface shim
  chatCompletionsCreate = (body) => {
    const lastMessage = body.messages[body.messages.length - 1];
    if (!lastMessage) {
      throw Error(`The messages array is empty.`);
    }
    const penUltMessage = body.messages[body.messages.length - 2];
    if (lastMessage?.tool_call_id && penUltMessage?.workflowId) {
      const workflowId = penUltMessage.workflowId;
      const callId = lastMessage.tool_call_id;
      const functionReturn = lastMessage.content || "";
      const functionCallRes = returnFunctionCall(this.baseUrl, this.apiKey)(callId, String(functionReturn));
      const nextMessageRes = functionCallRes.then(() => poll(nextMessage(this.baseUrl, this.apiKey), [workflowId]));
      return nextMessageRes.then((r) => {
        return {
          model: body.model,
          ...mapIudexToOpenAi(r, workflowId)
        };
      });
    }
    if (!lastMessage.content) {
      throw Error(`The message content is empty.`);
    }
    const messageContent = extractMessageTextContent(lastMessage.content);
    return startWorkflow(this.baseUrl, this.apiKey)(messageContent).then(
      ({ workflowId }) => poll(nextMessage(this.baseUrl, this.apiKey), [workflowId]).then((r) => {
        return {
          model: body.model,
          ...mapIudexToOpenAi(r, workflowId)
        };
      })
    );
  };
  chat = {
    completions: {
      create: this.chatCompletionsCreate
    }
  };
};
function mapIudexToOpenAi(m, workflowId) {
  if (m.type === "functionCall") {
    const message = {
      content: null,
      role: "assistant",
      tool_calls: [{
        id: m.functionCallId,
        function: { name: m.functionName, arguments: JSON.stringify(m.functionArgs) },
        type: "function"
      }],
      workflowId
    };
    return {
      id: m.id,
      choices: [{
        index: 0,
        finish_reason: "tool_calls",
        logprobs: null,
        message
      }],
      created: new Date(m.timestamp).valueOf(),
      object: "chat.completion"
    };
  }
  if (m.type === "text") {
    const message = {
      content: m.text,
      role: "assistant",
      workflowId
    };
    return {
      id: m.id,
      choices: [{
        index: 0,
        finish_reason: "stop",
        logprobs: null,
        message
      }],
      created: new Date(m.timestamp).valueOf(),
      object: "chat.completion"
    };
  }
  throw Error("Unsupported message type: " + m.type);
}
function extractMessageTextContent(content) {
  if (typeof content === "string") {
    return content;
  }
  return content.map((c) => c.type === "text" ? c.text : "").join("");
}
var src_default = Iudex;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DEFAULT_BASE_URL,
  Iudex,
  extractMessageTextContent,
  functionJsonSchema,
  mapIudexToOpenAi,
  nextMessage,
  nullFunctionJson,
  putFunctionJsons,
  returnFunctionCall,
  startWorkflow
});
//# sourceMappingURL=index.js.map