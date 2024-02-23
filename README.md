# Iudex client

**Easily build 🛠️ natural language interfaces for ✨ your own ✨ applications 💻**

Iudex is an API layer that allows you to quickly build applications that can use LLM reasoning in a way that is more
accurate, secure, and scalable than the toy examples from other projects. Iudex does this by providing an out-of-the-box
LLM orchestration architecture capable of working with millions of functions and documents.

**❗ Leverage the power 🦾 of LLMs 🤖 with Iudex ❗**

## Installation
```bash
npm install iudex
# or
yarn add iudex
# or
pnpm add iudex
```

## Getting Started

1. Sign up at [iudex.ai](https://iudex.ai) or shoot a message at support@iudex.ai to get an API key.
2. Install either the Node or Python client into your project. For Node, use `npm install iudex`.
3. Store the API key as an environment variable e.g. `IUDEX_API_KEY`.
4. Upload your function specs as function JSON schema.
5. Send a message to Iudex.
6. Get a computed result back.


## What can Iudex help you build?

1. Chat bots that can perform actions.

2. Connecting LLMs with any external APIs (Google, Reddit, Twitter, Slack, etc).

3. Generating dashboards from events databases.

4. Adding rules based evaluation to extracted data.


## How Iudex Works

Iudex works by first indexing your functions. Afterwards, when making a query, Iudex will figure out the best way to accomplish that query
by intelligently sequencing the functions you have connected and with the prebuilt functions we have created. This way, Iudex ensures
that the functions that get called do not suffer from hallucinations and can properly use the results from previously run functions.


## Usage

*Basic example*

```typescript
import dotenv from 'dotenv';
import { Iudex } from 'iudex';

/* 1. Instantiate client */
const iudex = new Iudex({ apiKey: process.env.IUDEX_API_KEY });

/* 2. Upload function json schemas */
await iudex.uploadFunctions([
  {
    name: 'getCurrentWeather',
    description: 'Gets the current weather',
    parameters: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 'The city and state, e.g. San Francisco, CA',
        },
        unit: { type: 'string', enum: ['celsius', 'fahrenheit'] },
      },
      required: ['location'],
    },
  },
]);

// Example function defined in code
function getCurrentWeather({ location, unit }: { location: string; unit: string }) {
  if (location.toLowerCase().includes('tokyo')) {
    return { location: 'Tokyo', temperature: '10', unit: 'celsius' };
  } else if (location.toLowerCase().includes('san francisco')) {
    return { location: 'San Francisco', temperature: '72', unit: 'fahrenheit' };
  } else if (location.toLowerCase().includes('paris')) {
    return { location: 'Paris', temperature: '22', unit: 'fahrenheit' };
  } else {
    return { location, temperature: 'unknown' };
  }
}

/* 3. Create a way to reference functions using strings */
function functionLinker(fnName: string) {
  return {
    getCurrentWeather,
  }[fnName];
};

/* 4. Send a message to Iudex */
const message = 'What is the weather in tokyo?';
const iudexReply = await iudex.sendMessage(message);

/* 5. See result */
console.log(`Result for "${message}": ${iudexReply}`);
```

*Example where using Iudex replaces OpenAI*

Iudex replaces instances of the OpenAI client where function calling is used.
`fnMap` just needs to be defined to link all functions you want the function calling
api to be able to call. For Iudex all parameters except `messages` is ignored.
Functions only need to be uploaded once.

```typescript
import dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';
import { Iudex } from 'iudex';
import _ from 'lodash';


/* 1. Instantiate client */
const iudex = new Iudex({ apiKey: process.env.IUDEX_API_KEY });


/* 2. Upload function json schemas */
await iudex.uploadFunctions([
  {
    name: 'getCurrentWeather',
    description: 'Gets the current weather',
    parameters: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 'The city and state, e.g. San Francisco, CA',
        },
        unit: { type: 'string', enum: ['celsius', 'fahrenheit'] },
      },
      required: ['location'],
    },
  },
]);

// Example function defined in code
function getCurrentWeather({ location, unit }: { location: string; unit: string }) {
  if (location.toLowerCase().includes('tokyo')) {
    return { location: 'Tokyo', temperature: '10', unit: 'celsius' };
  } else if (location.toLowerCase().includes('san francisco')) {
    return { location: 'San Francisco', temperature: '72', unit: 'fahrenheit' };
  } else if (location.toLowerCase().includes('paris')) {
    return { location: 'Paris', temperature: '22', unit: 'fahrenheit' };
  } else {
    return { location, temperature: 'unknown' };
  }
}


/* 3. Create a way to reference functions using strings */
const fnMap: Record<string, (...args: any[]) => any> = {
  getCurrentWeather,
};


/* 4. Track message history */
const messages = createMessages();


/* 5. Initial message goes here */
messages.push({ role: 'user', content: `what is the weather in San Francisco?` });


/* 6. Wait for AI response for which function to call */
messages.push(await iudex.chat.completions.create({
  model: 'gpt-4-turbo-preview',
  messages: messages.value,
  tools: [],
  tool_choice: 'auto',
}).then(res => res.choices[0].message));


/* 7. Keep calling functions until the initial message request is resolved */
let toolMessage = _.last(messages.value);
// Loop while the latest message contains the AI's request for a function to be called
while (toolMessage && messageHasToolCall(toolMessage)) {
  // Extract tool_call_id, function name, and function arguments
  const { function: fnCall, id: tool_call_id } = toolMessage.tool_calls[0];
  const { name: fnName, arguments: fnArgs } = fnCall;

  // Call the function
  const fnReturn = await fnMap[fnName](JSON.parse(fnArgs));

  // Push function return to message history
  messages.push({
    role: 'tool',
    tool_call_id,
    content: JSON.stringify(fnReturn),
  });

  // Push to ai response message history
  messages.push(await iudex.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: messages.value,
  }).then(res => res.choices[0].message));

  // Update toolMessage
  toolMessage = _.last(messages.value);
}


/* 8. Print final result */
console.log('Result: ', toolMessage);


//// Helpers


// Helper message object that also outputs to console
class Messages {
  messagesHist: OpenAI.ChatCompletionMessageParam[] = [];

  push = (...items: OpenAI.ChatCompletionMessageParam[]) => {
    console.log('new message:', items);
    this.messagesHist.push(...items);
  };

  get value() {
    return this.messagesHist;
  }
}
function createMessages() {
  return new Messages();
}

// Helper to check if a message has a tool call
type OpenAIToolCallMessage = OpenAI.ChatCompletionAssistantMessageParam
& { tool_calls: OpenAI.ChatCompletionMessageToolCall[] };

function messageHasToolCall(
  message: OpenAI.ChatCompletionMessageParam,
): message is OpenAIToolCallMessage {
  return !!(message as OpenAI.ChatCompletionAssistantMessageParam).tool_calls;
}
```
