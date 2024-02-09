# Iudex client

Iudex is an infrastructure that enables complex and accurate function calling apis. Our infrastructure provides a
natural language interface that can accomplish complex or answer complex queries given the control of your own functions.

Check out [iudex.ai](https://iudex.ai) to sign up.

## Client

To access Iudex, we highly recommend using this JavaScript client.

## Installation
```bash
npm install iudex
# or
yarn add iudex
# or
pnpm add iudex
```

## Usage

*Example where using Iudex replaces OpenAI*

Here, Iudex replaces instances of the OpenAI client where function calling is used.
`fnMap` just needs to be defined to link all functions you want the function calling
api to be able to call. For Iudex all parameters except `messages` is ignored.

```typescript
import dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';
import { Iudex } from 'iudex';
import _ from 'lodash';

const iudex = new Iudex({ apiKey: process.env.IUDEX_API_KEY });

// Message history
const messagesHist: OpenAI.ChatCompletionMessageParam[] = [];

// Log when messages are pushed
const messages = {
  push: (...items: OpenAI.ChatCompletionMessageParam[]) => {
    console.log('new message:', items);
    messagesHist.push(...items);
  },
  value: messagesHist,
};

// Initial request
messages.push({
  role: 'user',
  content: `what is ubers revenue in yen, use edgar`,
});

// Push message to pick a tool
messages.push(await iudex.chat.completions.create({
  model: 'gpt-4-turbo-preview',
  messages: messages.value,
  tools: [],
  tool_choice: 'auto',
}).then(res => res.choices[0].message));


let toolMessage = _.last(messages.value);
while (toolMessage && messageHasToolCall(toolMessage)) {
  const {
    function: { name: fnName, arguments: fnArgs },
    id: tool_call_id,
  } = toolMessage.tool_calls[0];

  // Call the function
  // const fnReturn = await fnMap[fnName](JSON.parse(fnArgs));
  const fnReturn = 'stubbed value';

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

console.log('FINISHED');


// Helpers

type OpenAIToolCallMessage = OpenAI.ChatCompletionAssistantMessageParam
& { tool_calls: OpenAI.ChatCompletionMessageToolCall[] };

function messageHasToolCall(
  message: OpenAI.ChatCompletionMessageParam,
): message is OpenAIToolCallMessage {
  return !!(message as OpenAI.ChatCompletionAssistantMessageParam).tool_calls;
}
```
