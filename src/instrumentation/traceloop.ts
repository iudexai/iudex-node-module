import { AnthropicInstrumentation } from '@traceloop/instrumentation-anthropic';
import { OpenAIInstrumentation } from '@traceloop/instrumentation-openai';
import { AzureOpenAIInstrumentation } from '@traceloop/instrumentation-azure';
import { LlamaIndexInstrumentation } from '@traceloop/instrumentation-llamaindex';
import {
  AIPlatformInstrumentation,
  VertexAIInstrumentation,
} from '@traceloop/instrumentation-vertexai';
import { BedrockInstrumentation } from '@traceloop/instrumentation-bedrock';
import { CohereInstrumentation } from '@traceloop/instrumentation-cohere';
import { PineconeInstrumentation } from '@traceloop/instrumentation-pinecone';
import { LangChainInstrumentation } from '@traceloop/instrumentation-langchain';
import { ChromaDBInstrumentation } from '@traceloop/instrumentation-chromadb';

export function traceloopInstrumentations() {
  const instrumentations = [
    new AnthropicInstrumentation(),
    new OpenAIInstrumentation(),
    new AzureOpenAIInstrumentation(),
    new LlamaIndexInstrumentation(),
    new AIPlatformInstrumentation(),
    new VertexAIInstrumentation(),
    new BedrockInstrumentation(),
    new CohereInstrumentation(),
    new PineconeInstrumentation(),
    new LangChainInstrumentation(),
    new ChromaDBInstrumentation(),
  ];
  return instrumentations;
}
