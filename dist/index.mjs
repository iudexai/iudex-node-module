// src/client.ts
function checkResponse(r) {
  if (!r.ok) {
    throw Error(`Request ${r.url} failed with ${r.status}: ${r.statusText}`);
  }
  return r;
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
  return checkResponse(r).json().then(throwOnApiError).then(unwrapApi).catch((e) => {
    throw Error(`Request ${r.url} failed with ${r.status}: ${e.message}`);
  });
}
function returnFunctionCall(baseUrl, apiKey) {
  return function(functionCallId, functionReturn) {
    const bodyJson = {
      functionCallId,
      functionReturn: JSON.stringify(functionReturn)
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

// src/index.ts
var DEFAULT_BASE_URL = "https://5pz08znmzj.execute-api.us-west-2.amazonaws.com";
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
  sendMessage = async (message) => {
    if (!this.functionLinker) {
      throw Error(
        "Establish a way to call functions using `.linkFunctions` before sending a message."
      );
    }
    const { workflowId } = await startWorkflow(this.baseUrl, this.apiKey)(message);
    let nextMessage2 = await poll(nextMessage(this.baseUrl, this.apiKey), [workflowId]);
    while (nextMessage2.type === "functionCall") {
      const fn = this.functionLinker(nextMessage2.functionName);
      const fnReturn = await fn(nextMessage2.functionArgs);
      await returnFunctionCall(this.baseUrl, this.apiKey)(
        nextMessage2.functionCallId,
        JSON.stringify(fnReturn)
      );
      nextMessage2 = await poll(nextMessage(this.baseUrl, this.apiKey), [workflowId]);
    }
    return nextMessage2.text;
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
      const functionReturn = lastMessage.content;
      const functionCallRes = returnFunctionCall(this.baseUrl, this.apiKey)(callId, functionReturn);
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
export {
  DEFAULT_BASE_URL,
  Iudex,
  src_default as default,
  extractMessageTextContent,
  mapIudexToOpenAi,
  nextMessage,
  putFunctionJsons,
  returnFunctionCall,
  startWorkflow
};
//# sourceMappingURL=index.mjs.map