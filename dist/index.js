"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  DEFAULT_BASE_URL: () => DEFAULT_BASE_URL,
  Feasibility: () => Feasibility,
  Iudex: () => Iudex,
  Resolution: () => Resolution,
  TaskStatus: () => TaskStatus,
  TerminalTaskStatuses: () => TerminalTaskStatuses,
  WorkflowStatus: () => WorkflowStatus,
  baseTaskSchema: () => baseTaskSchema,
  chatErrorSchema: () => chatErrorSchema,
  chatFunctionCallSchema: () => chatFunctionCallSchema,
  chatFunctionReturnSchema: () => chatFunctionReturnSchema,
  chatImageSchema: () => chatImageSchema,
  chatListSchema: () => chatListSchema,
  chatTextSchema: () => chatTextSchema,
  chatTurnSchema: () => chatTurnSchema,
  createClient: () => createClient,
  createFunctionClient: () => createFunctionClient,
  createWorkflowClient: () => createWorkflowClient,
  extractMessageTextContent: () => extractMessageTextContent,
  feasibilityCheckSchema: () => feasibilityCheckSchema,
  fetchGetWorkflowById: () => fetchGetWorkflowById,
  fetchGetWorkflows: () => fetchGetWorkflows,
  fetchPostWorkflows: () => fetchPostWorkflows,
  getFirstTaskByStatus: () => getFirstTaskByStatus,
  getLastTaskByStatus: () => getLastTaskByStatus,
  getWorkflowByIdReqSchema: () => getWorkflowByIdReqSchema,
  getWorkflowByIdResSchema: () => getWorkflowByIdResSchema,
  getWorkflowsResSchema: () => getWorkflowsResSchema,
  mapIudexToOpenAi: () => mapIudexToOpenAi,
  nextMessage: () => nextMessage,
  postWorkflowsReqSchema: () => postWorkflowsReqSchema,
  postWorkflowsResSchema: () => postWorkflowsResSchema,
  preOrderTraversal: () => preOrderTraversal,
  putFunctionJsons: () => putFunctionJsons,
  resolutionCheckSchema: () => resolutionCheckSchema,
  returnFunctionCall: () => returnFunctionCall,
  reversePreOrderTraversal: () => reversePreOrderTraversal,
  startWorkflow: () => startWorkflow,
  taskErroredSchema: () => taskErroredSchema,
  taskExecutingSchema: () => taskExecutingSchema,
  taskPendingSchema: () => taskPendingSchema,
  taskPlanningSchema: () => taskPlanningSchema,
  taskResolvedSchema: () => taskResolvedSchema,
  taskSchema: () => taskSchema,
  taskSequencedSchema: () => taskSequencedSchema,
  taskSequencingSchema: () => taskSequencingSchema,
  workflowInfoSchema: () => workflowInfoSchema,
  workflowMetadataSchema: () => workflowMetadataSchema,
  workflowSchema: () => workflowSchema
});
module.exports = __toCommonJS(src_exports);
__reExport(src_exports, require("function-json-schema"), module.exports);

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
  return function(jsons, module2) {
    const bodyJson = { jsons, module: module2 };
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
var import_zod3 = __toESM(require("zod"));

// src/types/task-types.ts
var import_zod = __toESM(require("zod"));
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
var baseTaskSchema = import_zod.default.object({
  id: import_zod.default.string(),
  description: import_zod.default.string(),
  status: import_zod.default.nativeEnum(TaskStatus),
  stepIndex: import_zod.default.number(),
  depth: import_zod.default.number(),
  numRewrites: import_zod.default.number()
});
var Feasibility = {
  Feasible: "Feasible",
  Rewritable: "Rewritable",
  Infeasible: "Infeasible"
};
var feasibilityCheckSchema = import_zod.default.object({
  feasibility: import_zod.default.nativeEnum(Feasibility),
  reason: import_zod.default.coerce.string(),
  fix: import_zod.default.string().optional()
});
var Resolution = {
  Resolved: "Resolved",
  Rewritable: "Rewritable",
  Infeasible: "Infeasible"
};
var resolutionCheckSchema = import_zod.default.object({
  resolution: import_zod.default.nativeEnum(Resolution),
  reason: import_zod.default.coerce.string(),
  fix: import_zod.default.string().optional()
});
var taskPendingSchema = baseTaskSchema.extend({
  status: import_zod.default.literal(TaskStatus.Pending)
});
var taskPlanningSchema = baseTaskSchema.extend({
  status: import_zod.default.literal(TaskStatus.Planning),
  // present if rewriting
  program: import_zod.default.string().optional(),
  feasibilityCheck: feasibilityCheckSchema.optional(),
  // present if rewriting from executor
  resolutionCheck: resolutionCheckSchema.optional()
});
var taskExecutingSchema = baseTaskSchema.extend({
  status: import_zod.default.literal(TaskStatus.Executing),
  program: import_zod.default.string(),
  usedFunctionNames: import_zod.default.array(import_zod.default.string()),
  feasibilityCheck: feasibilityCheckSchema
});
var taskResolvedSchema = baseTaskSchema.extend({
  status: import_zod.default.literal(TaskStatus.Resolved),
  program: import_zod.default.string(),
  usedFunctionNames: import_zod.default.array(import_zod.default.string()),
  feasibilityCheck: feasibilityCheckSchema,
  resolutionCheck: resolutionCheckSchema
});
var taskSequencingSchema = baseTaskSchema.extend({
  status: import_zod.default.literal(TaskStatus.Sequencing),
  program: import_zod.default.string(),
  feasibilityCheck: feasibilityCheckSchema,
  // present if sequencing from executor
  usedFunctionNames: import_zod.default.array(import_zod.default.string()).optional(),
  resolutionCheck: resolutionCheckSchema.optional()
});
var taskSequencedSchema = baseTaskSchema.extend({
  status: import_zod.default.literal(TaskStatus.Sequenced),
  program: import_zod.default.string(),
  subtasks: import_zod.default.lazy(() => taskSchema.array()),
  feasibilityCheck: feasibilityCheckSchema,
  usedFunctionNames: import_zod.default.array(import_zod.default.string()).optional(),
  resolutionCheck: resolutionCheckSchema.optional()
});
var taskErroredSchema = baseTaskSchema.extend({
  status: import_zod.default.literal(TaskStatus.Errored),
  errorMsg: import_zod.default.string(),
  errorName: import_zod.default.string(),
  errorStack: import_zod.default.string().optional()
});
var taskSchema = import_zod.default.union([
  taskPendingSchema,
  taskPlanningSchema,
  taskExecutingSchema,
  taskResolvedSchema,
  taskSequencingSchema,
  taskSequencedSchema,
  taskErroredSchema
]);

// src/types/workflow-types.ts
var import_zod2 = __toESM(require("zod"));
var WorkflowStatus = {
  Running: "Running",
  Completed: "Completed",
  Failed: "Failed",
  Paused: "Paused",
  TimedOut: "TimedOut"
};
var workflowMetadataSchema = import_zod2.default.object({
  maxFunctionMatches: import_zod2.default.number().optional()
});
var workflowSchema = import_zod2.default.object({
  workflowId: import_zod2.default.string(),
  root: taskSchema,
  modules: import_zod2.default.array(import_zod2.default.string()).optional(),
  createdAt: import_zod2.default.string(),
  updatedAt: import_zod2.default.string(),
  metadata: workflowMetadataSchema.optional(),
  orgId: import_zod2.default.string()
});
var workflowInfoSchema = import_zod2.default.object({
  workflowId: import_zod2.default.string(),
  modules: import_zod2.default.array(import_zod2.default.string()).optional(),
  createdAt: import_zod2.default.string(),
  updatedAt: import_zod2.default.string(),
  // Task summary
  description: import_zod2.default.string(),
  status: import_zod2.default.nativeEnum(WorkflowStatus),
  numLeafTasks: import_zod2.default.number()
});

// src/clients/workflow-schemas.ts
var getWorkflowsResSchema = import_zod3.default.object({
  workflowInfos: import_zod3.default.array(workflowInfoSchema)
});
var getWorkflowByIdReqSchema = import_zod3.default.object({
  workflowId: import_zod3.default.string()
});
var getWorkflowByIdResSchema = import_zod3.default.object({
  workflow: taskSchema
  // root task
});
var postWorkflowsReqSchema = import_zod3.default.object({
  query: import_zod3.default.string(),
  // Undefined means use all org modules. [] means use all modules.
  modules: import_zod3.default.array(import_zod3.default.string()).optional(),
  opts: import_zod3.default.object({
    maxFunctionMatches: import_zod3.default.number().optional()
  }).optional()
});
var postWorkflowsResSchema = import_zod3.default.object({
  message: import_zod3.default.string(),
  workflowId: import_zod3.default.string()
});

// src/types/chat-types.ts
var import_zod4 = require("zod");
var chatTurnBaseSchema = import_zod4.z.object({
  id: import_zod4.z.string(),
  type: import_zod4.z.string(),
  sender: import_zod4.z.string(),
  timestamp: import_zod4.z.string()
});
var chatTextSchema = chatTurnBaseSchema.extend({
  type: import_zod4.z.literal("text"),
  text: import_zod4.z.string()
});
var chatErrorSchema = chatTurnBaseSchema.extend({
  type: import_zod4.z.literal("error"),
  name: import_zod4.z.string(),
  message: import_zod4.z.string(),
  cause: import_zod4.z.string().optional(),
  stack: import_zod4.z.string().optional()
});
var chatImageSchema = chatTurnBaseSchema.extend({
  type: import_zod4.z.literal("image"),
  image: import_zod4.z.string(),
  description: import_zod4.z.string()
});
var chatListSchema = chatTurnBaseSchema.extend({
  type: import_zod4.z.literal("list"),
  list: import_zod4.z.array(import_zod4.z.string())
});
var chatFunctionCallSchema = chatTurnBaseSchema.extend({
  type: import_zod4.z.literal("functionCall"),
  functionCallId: import_zod4.z.string(),
  functionName: import_zod4.z.string(),
  functionArgs: import_zod4.z.record(import_zod4.z.unknown())
});
var chatFunctionReturnSchema = chatTurnBaseSchema.extend({
  type: import_zod4.z.literal("functionReturn"),
  functionCallId: import_zod4.z.string(),
  functionReturn: import_zod4.z.string()
});
var chatTurnSchema = import_zod4.z.discriminatedUnion("type", [
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
  workflowSchema,
  ...require("function-json-schema")
});
//# sourceMappingURL=index.js.map