// src/index.ts
export * from "function-json-schema";

// src/utils.ts
function setTimeoutPromise(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function poll(fn, args, {
  maxTries,
  tries,
  waitMs
} = { maxTries: 60, tries: 0, waitMs: 1e3 }) {
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
function deconstructedPromise() {
  let promiseResolve;
  let promiseReject;
  const promise = new Promise((resolve, reject) => {
    promiseResolve = resolve;
    promiseReject = reject;
  });
  return {
    promise,
    resolve: promiseResolve,
    reject: promiseReject
  };
}

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_isPlaceholder.js
function _isPlaceholder(a) {
  return a != null && typeof a === "object" && a["@@functional/placeholder"] === true;
}

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_curry1.js
function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_curry2.js
function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function(_b) {
          return fn(a, _b);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function(_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function(_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_isArray.js
var isArray_default = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === "[object Array]";
};

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_has.js
function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_isArguments.js
var toString = Object.prototype.toString;
var _isArguments = /* @__PURE__ */ function() {
  return toString.call(arguments) === "[object Arguments]" ? function _isArguments2(x) {
    return toString.call(x) === "[object Arguments]";
  } : function _isArguments2(x) {
    return _has("callee", x);
  };
}();
var isArguments_default = _isArguments;

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/keys.js
var hasEnumBug = !/* @__PURE__ */ {
  toString: null
}.propertyIsEnumerable("toString");
var nonEnumerableProps = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
var hasArgsEnumBug = /* @__PURE__ */ function() {
  "use strict";
  return arguments.propertyIsEnumerable("length");
}();
var contains = function contains2(list, item) {
  var idx = 0;
  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }
    idx += 1;
  }
  return false;
};
var keys = typeof Object.keys === "function" && !hasArgsEnumBug ? /* @__PURE__ */ _curry1(function keys2(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}) : /* @__PURE__ */ _curry1(function keys3(obj) {
  if (Object(obj) !== obj) {
    return [];
  }
  var prop, nIdx;
  var ks = [];
  var checkArgsLength = hasArgsEnumBug && isArguments_default(obj);
  for (prop in obj) {
    if (_has(prop, obj) && (!checkArgsLength || prop !== "length")) {
      ks[ks.length] = prop;
    }
  }
  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;
    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];
      if (_has(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }
      nIdx -= 1;
    }
  }
  return ks;
});
var keys_default = keys;

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_toISOString.js
var pad = function pad2(n) {
  return (n < 10 ? "0" : "") + n;
};
var _toISOString = typeof Date.prototype.toISOString === "function" ? function _toISOString2(d) {
  return d.toISOString();
} : function _toISOString3(d) {
  return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "." + (d.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
};

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_arrayReduce.js
function _arrayReduce(reducer, acc, list) {
  var index = 0;
  var length = list.length;
  while (index < length) {
    acc = reducer(acc, list[index]);
    index += 1;
  }
  return acc;
}

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_isInteger.js
var isInteger_default = Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
};

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/mapObjIndexed.js
var mapObjIndexed = /* @__PURE__ */ _curry2(function mapObjIndexed2(fn, obj) {
  return _arrayReduce(function(acc, key) {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {}, keys_default(obj));
});
var mapObjIndexed_default = mapObjIndexed;

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/trim.js
var hasProtoTrim = typeof String.prototype.trim === "function";

// src/clients/function-client.ts
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
  return checkResponse(r).then(throwOnApiError).then(unwrapApi).then((v) => {
    if (process.env.DEBUG_MODE) {
      console.log((/* @__PURE__ */ new Date()).toISOString(), "Response:", v);
    }
    return v;
  }).catch((e) => {
    throw Error(`Request ${r.url} failed with ${r.status}: ${e.message}`);
  });
}
function createFunctionClient(baseUrl, apiKey) {
  const fns = {
    returnFunctionCall,
    nextMessage,
    startWorkflow,
    putFunctionJsons
  };
  return mapObjIndexed_default((fn) => fn(baseUrl, apiKey), fns);
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
  return function(jsons, module) {
    const bodyJson = { jsons, module };
    return fetch(baseUrl + "/function_jsons", {
      method: "PUT",
      headers: { "x-api-key": `${apiKey}` },
      body: JSON.stringify(bodyJson)
    }).then(parseIudexResponse);
  };
}

// src/clients/workflow-client.ts
function createWorkflowClient(baseUrl, apiKey) {
  const fns = {
    fetchGetWorkflows,
    fetchGetWorkflowById,
    fetchPostWorkflows
  };
  return mapObjIndexed_default((fn) => fn(baseUrl, apiKey), fns);
}
async function checkResponseStatus(res) {
  const body = await res.json();
  if (!res.ok) {
    const error = body.error || res.statusText;
    throw new Error(`Request failed with: ${error}`);
  }
  return body;
}
function fetchGetWorkflows(baseUrl, apiKey) {
  return function() {
    return fetch(`${baseUrl}/workflows`, {
      method: "GET",
      headers: { "x-api-key": apiKey }
    }).then(checkResponseStatus);
  };
}
function fetchGetWorkflowById(baseUrl, apiKey) {
  return function(req) {
    return fetch(`${baseUrl}/workflows/${req.workflowId}`, {
      method: "GET",
      headers: { "x-api-key": apiKey }
    }).then(checkResponseStatus);
  };
}
function fetchPostWorkflows(baseUrl, apiKey) {
  return function(req) {
    return fetch(`${baseUrl}/workflows`, {
      method: "POST",
      body: JSON.stringify(req),
      headers: { "x-api-key": apiKey }
    }).then(checkResponseStatus);
  };
}

// src/clients/workflow-schemas.ts
import z3 from "zod";

// src/types/task-types.ts
import z from "zod";
var TaskStatus = {
  // Queued state
  Pending: "Pending",
  // awaiting processing
  // Processing states
  Planning: "Planning",
  // in programmer
  Executing: "Executing",
  // in executor
  Sequencing: "Sequencing",
  // in sequencer
  // Terminal states
  Resolved: "Resolved",
  // execution resolved task
  Sequenced: "Sequenced",
  // no resolution; sequuencer created subtasks
  Errored: "Errored"
  // unrecoverable error during processing
};
var TerminalTaskStatuses = [
  TaskStatus.Resolved,
  TaskStatus.Sequenced,
  TaskStatus.Errored
];
var baseTaskSchema = z.object({
  id: z.string(),
  description: z.string(),
  status: z.nativeEnum(TaskStatus),
  stepIndex: z.number(),
  depth: z.number(),
  numRewrites: z.number()
});
var Feasibility = {
  Feasible: "Feasible",
  Rewritable: "Rewritable",
  Infeasible: "Infeasible"
};
var feasibilityCheckSchema = z.object({
  feasibility: z.nativeEnum(Feasibility),
  reason: z.coerce.string(),
  fix: z.string().optional()
});
var Resolution = {
  Resolved: "Resolved",
  Rewritable: "Rewritable",
  Infeasible: "Infeasible"
};
var resolutionCheckSchema = z.object({
  resolution: z.nativeEnum(Resolution),
  reason: z.coerce.string(),
  fix: z.string().optional()
});
var taskPendingSchema = baseTaskSchema.extend({
  status: z.literal(TaskStatus.Pending)
});
var taskPlanningSchema = baseTaskSchema.extend({
  status: z.literal(TaskStatus.Planning),
  // present if rewriting
  program: z.string().optional(),
  feasibilityCheck: feasibilityCheckSchema.optional(),
  // present if rewriting from executor
  resolutionCheck: resolutionCheckSchema.optional()
});
var taskExecutingSchema = baseTaskSchema.extend({
  status: z.literal(TaskStatus.Executing),
  program: z.string(),
  usedFunctionNames: z.array(z.string()),
  feasibilityCheck: feasibilityCheckSchema
});
var taskResolvedSchema = baseTaskSchema.extend({
  status: z.literal(TaskStatus.Resolved),
  program: z.string(),
  usedFunctionNames: z.array(z.string()),
  feasibilityCheck: feasibilityCheckSchema,
  resolutionCheck: resolutionCheckSchema
});
var taskSequencingSchema = baseTaskSchema.extend({
  status: z.literal(TaskStatus.Sequencing),
  program: z.string(),
  feasibilityCheck: feasibilityCheckSchema,
  // present if sequencing from executor
  usedFunctionNames: z.array(z.string()).optional(),
  resolutionCheck: resolutionCheckSchema.optional()
});
var taskSequencedSchema = baseTaskSchema.extend({
  status: z.literal(TaskStatus.Sequenced),
  program: z.string(),
  subtasks: z.lazy(() => taskSchema.array()),
  feasibilityCheck: feasibilityCheckSchema,
  usedFunctionNames: z.array(z.string()).optional(),
  resolutionCheck: resolutionCheckSchema.optional()
});
var taskErroredSchema = baseTaskSchema.extend({
  status: z.literal(TaskStatus.Errored),
  errorMsg: z.string(),
  errorName: z.string(),
  errorStack: z.string().optional()
});
var taskSchema = z.union([
  taskPendingSchema,
  taskPlanningSchema,
  taskExecutingSchema,
  taskResolvedSchema,
  taskSequencingSchema,
  taskSequencedSchema,
  taskErroredSchema
]);

// src/types/workflow-types.ts
import z2 from "zod";
var WorkflowStatus = {
  Running: "Running",
  Completed: "Completed",
  Failed: "Failed",
  Paused: "Paused",
  TimedOut: "TimedOut"
};
var workflowMetadataSchema = z2.object({
  maxFunctionMatches: z2.number().optional()
});
var workflowSchema = z2.object({
  workflowId: z2.string(),
  root: taskSchema,
  modules: z2.array(z2.string()).optional(),
  createdAt: z2.string(),
  updatedAt: z2.string(),
  metadata: workflowMetadataSchema.optional(),
  orgId: z2.string()
});
var workflowInfoSchema = z2.object({
  workflowId: z2.string(),
  modules: z2.array(z2.string()).optional(),
  createdAt: z2.string(),
  updatedAt: z2.string(),
  // Task summary
  description: z2.string(),
  status: z2.nativeEnum(WorkflowStatus),
  numLeafTasks: z2.number()
});

// src/clients/workflow-schemas.ts
var getWorkflowsResSchema = z3.object({
  workflowInfos: z3.array(workflowInfoSchema)
});
var getWorkflowByIdReqSchema = z3.object({
  workflowId: z3.string()
});
var getWorkflowByIdResSchema = z3.object({
  workflow: taskSchema
  // root task
});
var postWorkflowsReqSchema = z3.object({
  query: z3.string(),
  // Undefined means use all org modules. [] means use all modules.
  modules: z3.array(z3.string()).optional(),
  opts: z3.object({
    maxFunctionMatches: z3.number().optional()
  }).optional()
});
var postWorkflowsResSchema = z3.object({
  message: z3.string(),
  workflowId: z3.string()
});

// src/types/chat-types.ts
import { z as z4 } from "zod";
var chatTurnBaseSchema = z4.object({
  id: z4.string(),
  type: z4.string(),
  sender: z4.string(),
  timestamp: z4.string()
});
var chatTextSchema = chatTurnBaseSchema.extend({
  type: z4.literal("text"),
  text: z4.string()
});
var chatErrorSchema = chatTurnBaseSchema.extend({
  type: z4.literal("error"),
  name: z4.string(),
  message: z4.string(),
  cause: z4.string().optional(),
  stack: z4.string().optional()
});
var chatImageSchema = chatTurnBaseSchema.extend({
  type: z4.literal("image"),
  image: z4.string(),
  description: z4.string()
});
var chatListSchema = chatTurnBaseSchema.extend({
  type: z4.literal("list"),
  list: z4.array(z4.string())
});
var chatFunctionCallSchema = chatTurnBaseSchema.extend({
  type: z4.literal("functionCall"),
  functionCallId: z4.string(),
  functionName: z4.string(),
  functionArgs: z4.record(z4.unknown())
});
var chatFunctionReturnSchema = chatTurnBaseSchema.extend({
  type: z4.literal("functionReturn"),
  functionCallId: z4.string(),
  functionReturn: z4.string()
});
var chatTurnSchema = z4.discriminatedUnion("type", [
  chatTextSchema,
  chatErrorSchema,
  chatImageSchema,
  chatListSchema,
  chatFunctionCallSchema,
  chatFunctionReturnSchema
]);

// src/index.ts
var DEFAULT_BASE_URL = "https://api.iudex.ai";
function createClient(baseUrl, apiKey) {
  return {
    ...createFunctionClient(baseUrl, apiKey),
    ...createWorkflowClient(baseUrl, apiKey)
  };
}
var Iudex = class {
  baseUrl;
  apiKey;
  maxTries;
  client;
  currentWorkflowId;
  functionLinker;
  constructor({
    apiKey = process.env.IUDEX_API_KEY,
    baseUrl = process.env.IUDEX_BASE_URL || DEFAULT_BASE_URL,
    maxTries = process.env.IUDEX_MAX_TRIES ? parseInt(process.env.IUDEX_MAX_TRIES) : 60
  } = {}) {
    if (!apiKey) {
      throw Error(
        `The IUDEX_API_KEY environment variable is missing or empty. Provide IUDEX_API_KEY to the environment on load OR instantiate the Iudex client with the apiKey option. Example: \`new Iudex({ apiKey: 'My API Key' })\``
      );
    }
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.maxTries = maxTries;
    this.client = createClient(this.baseUrl, this.apiKey);
    this.streamCurrentTask = this.streamCurrentTask.bind(this);
  }
  uploadFunctions = (jsons, modules) => {
    return this.client.putFunctionJsons(jsons, modules);
  };
  linkFunctions = (functionLinker) => {
    this.functionLinker = functionLinker;
  };
  /**
   * @param message message to send
   * @returns response as a chat object
   */
  sendChatTurn = async (message, opts = {}) => {
    const { onChatTurn, modules } = opts;
    const {
      promise: currentWorkflowId,
      resolve: setCurrentWorkflowId,
      reject: rejectCurrentWorkflowId
    } = deconstructedPromise();
    this.currentWorkflowId = currentWorkflowId;
    const userTurn = {
      id: "msg_ephemeral_" + (/* @__PURE__ */ new Date()).toISOString(),
      type: "text",
      sender: "you",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      text: message
    };
    onChatTurn?.(userTurn);
    const { workflowId } = await this.client.startWorkflow(userTurn.text, modules).catch((e) => {
      rejectCurrentWorkflowId(e);
      throw e;
    });
    setCurrentWorkflowId(workflowId);
    let nextMessage2 = await poll(
      this.client.nextMessage,
      [workflowId],
      { maxTries: 60, tries: 0, waitMs: 1e3 }
    );
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
      await this.client.returnFunctionCall(
        fnReturnTurn.functionCallId,
        fnReturnTurn.functionReturn
      );
      nextMessage2 = await poll(
        this.client.nextMessage,
        [workflowId],
        { maxTries: 60, tries: 0, waitMs: 1e3 }
      );
      onChatTurn?.(nextMessage2);
    }
    return nextMessage2;
  };
  /**
   * @param message message to send
   * @returns response message as a string
   */
  sendMessage = async (message, opts = {}) => {
    const chatTurn = await this.sendChatTurn(message, opts);
    return chatTurn.text;
  };
  async *streamCurrentTask() {
    if (!this.currentWorkflowId) {
      throw Error("No current workflow id. Send a message first.");
    }
    const workflowId = await this.currentWorkflowId;
    let rootTask = await this.client.fetchGetWorkflowById({ workflowId }).then((r) => r.workflow);
    let processingTask = getFirstTaskByStatus(rootTask, [
      "Pending",
      "Planning",
      "Executing",
      "Sequencing"
    ]);
    let oldProcessingTask;
    while (processingTask) {
      if (oldProcessingTask?.id !== processingTask.id || oldProcessingTask?.status !== processingTask.status) {
        yield processingTask;
        oldProcessingTask = processingTask;
      }
      await setTimeoutPromise(1e3);
      rootTask = await this.client.fetchGetWorkflowById({ workflowId }).then((r) => r.workflow);
      const maybeErroredTask = getLastTaskByStatus(rootTask, "Errored");
      if (maybeErroredTask) {
        yield maybeErroredTask;
        return;
      }
      processingTask = getFirstTaskByStatus(rootTask, [
        "Pending",
        "Planning",
        "Executing",
        "Sequencing"
      ]);
    }
    const resolvedTask = getLastTaskByStatus(rootTask, "Resolved");
    if (!resolvedTask) {
      throw Error("No processing nor resolved task found.");
    }
    yield resolvedTask;
    return;
  }
  // ======================= OpenAI interface shim ======================
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
      const functionCallRes = this.client.returnFunctionCall(callId, String(functionReturn));
      const nextMessageRes = functionCallRes.then(() => poll(
        this.client.nextMessage,
        [workflowId],
        { maxTries: 60, tries: 0, waitMs: 1e3 }
      ));
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
    const {
      promise: currentWorkflowId,
      resolve: setCurrentWorkflowId,
      reject: rejectCurrentWorkflowId
    } = deconstructedPromise();
    this.currentWorkflowId = currentWorkflowId;
    const messageContent = extractMessageTextContent(lastMessage.content);
    return this.client.startWorkflow(messageContent).then(({ workflowId }) => {
      setCurrentWorkflowId(workflowId);
      return poll(
        this.client.nextMessage,
        [workflowId],
        { maxTries: 60, tries: 0, waitMs: 1e3 }
      ).then((r) => {
        return {
          model: body.model,
          ...mapIudexToOpenAi(r, workflowId)
        };
      });
    }).catch((e) => {
      rejectCurrentWorkflowId(e);
      throw e;
    });
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
function getLastTaskByStatus(root, status) {
  const arrayStatus = !Array.isArray(status) ? [status] : status;
  const traverse = reversePreOrderTraversal(
    (t) => t.subtasks || [],
    (t) => arrayStatus.includes(t.status)
  );
  return traverse(root);
}
function getFirstTaskByStatus(root, status) {
  const arrayStatus = !Array.isArray(status) ? [status] : status;
  const traverse = preOrderTraversal(
    (t) => t.subtasks || [],
    (t) => arrayStatus.includes(t.status)
  );
  return traverse(root);
}
function reversePreOrderTraversal(getChildren, predicate) {
  return function traverse(node) {
    if (predicate(node)) {
      return node;
    }
    const reversedChildren = getChildren(node).reverse();
    for (const child of reversedChildren) {
      const maybeFound = traverse(child);
      if (maybeFound !== void 0) {
        return maybeFound;
      }
    }
    return void 0;
  };
}
function preOrderTraversal(getChildren, predicate) {
  return function traverse(node) {
    if (predicate(node)) {
      return node;
    }
    const children = getChildren(node);
    for (const child of children) {
      const maybeFound = traverse(child);
      if (maybeFound !== void 0) {
        return maybeFound;
      }
    }
    return void 0;
  };
}
export {
  DEFAULT_BASE_URL,
  Feasibility,
  Iudex,
  Resolution,
  TaskStatus,
  TerminalTaskStatuses,
  WorkflowStatus,
  baseTaskSchema,
  chatErrorSchema,
  chatFunctionCallSchema,
  chatFunctionReturnSchema,
  chatImageSchema,
  chatListSchema,
  chatTextSchema,
  chatTurnSchema,
  createClient,
  createFunctionClient,
  createWorkflowClient,
  extractMessageTextContent,
  feasibilityCheckSchema,
  fetchGetWorkflowById,
  fetchGetWorkflows,
  fetchPostWorkflows,
  getFirstTaskByStatus,
  getLastTaskByStatus,
  getWorkflowByIdReqSchema,
  getWorkflowByIdResSchema,
  getWorkflowsResSchema,
  mapIudexToOpenAi,
  nextMessage,
  postWorkflowsReqSchema,
  postWorkflowsResSchema,
  preOrderTraversal,
  putFunctionJsons,
  resolutionCheckSchema,
  returnFunctionCall,
  reversePreOrderTraversal,
  startWorkflow,
  taskErroredSchema,
  taskExecutingSchema,
  taskPendingSchema,
  taskPlanningSchema,
  taskResolvedSchema,
  taskSchema,
  taskSequencedSchema,
  taskSequencingSchema,
  workflowInfoSchema,
  workflowMetadataSchema,
  workflowSchema
};
//# sourceMappingURL=index.mjs.map