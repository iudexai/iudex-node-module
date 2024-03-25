# Function JSON Schema

Function JSON Schema types are nonstandard but used in OpenAI's function calling and assistants APIs.
This library exists to create the **types and validation** for JSON schema objects that can be passed to LLMs.

The types and validation are created from Zod types.

## Installation

```bash
npm install function-json-schema
# or
yarn add function-json-schema
# or
pnpm add function-json-schema
```

## Schema

OpenAI slightly modified JSON schema because the original [JSON schema specification](https://json-schema.org/specification) does not include functions because functions are not serializable into JSON. Our function JSON schema codies roughly what OpenAI uses in their examples but includes additional restrictions and flexibility for better LLM results.

```typescript
export const functionJsonSchema = z.object({
  name: z.string(),
  description: z.string(),
  parameters: z.union([
    z.object({
      type: z.literal('object'),
      properties: z.record(valueJsonSchema),
      description: z.string().optional(),
      required: z.array(z.string()).optional(),
    }),
    z.array(valueJsonSchema),
  ]),
  returns: valueJsonSchema,
  usageExample: z.string().optional(),
  returnsExample: z.string().optional(),
});
```

Keen eyes will notice the inclusion a few extra type changes:

- `description` is mandatory.

- `parameters` can be an array value to represent functions with argument lists rather than just a single object.

- `returns` is mandatory and represents the return value of the function.

- `usageExample` and `returnsExample` for additional documentation.

We encourage filling these out as best practice for your functions.
However, the loose type can still be extracted with the `coerceFunctionJsonSchema` validator.

Additionally, we have added some new types:

- For unknown types
```typescript
const unknownJsonSchema = z.object({
  type: z.literal('unknown'),
  description: z.string().optional(),
});
```

- For union types
```typescript
/**
 * This is not the real way to represent union types in JSON Schema.
 * The real way sucks.
 */
const unionJsonSchema = z.object({
  type: z.array(z.string()),
  description: z.string().optional(),
});
/**
 * The real way to represent unions
 */
const realUnionJsonSchema: z.ZodType<RealUnionJsonSchema>  = z.object({
  anyOf: z.array(z.lazy(() => valueJsonSchema)),
  description: z.string().optional(),
});
```

## Usage

*Basic compilation time example*

```typescript
import { FunctionJson } from 'function-json-schema';

const schema: FunctionJson = {
  name: 'getCurrentWeather',
  description: 'Gets the current weather',
  parameters: {
    type: 'object',
    properties: {
      location: {
        type: 'string',
        description: 'The location to get the weather for',
      },
      unit: { type: 'string', enum: ['celsius', 'fahrenheit'] },
    },
    required: ['location'],
  },
  returns: {
    type: 'object',
    properties: {
      temperature: {
        description: 'The temperature value.',
        type: 'number',
      },
      temperatureUnit: {
        description: 'The temperature unit.',
        type: 'number',
      },
      windSpeed: {
        description: 'The wind speed in miles per hour.',
        type: 'number',
      },
      shortForecast: {
        description: 'A short description of the forecast.',
        type: 'string',
      },
    },
  },
};
```

*Basic run time example*

```typescript
import { functionJsonSchema, coerceFunctionJsonSchema } from 'function-json-schema';

const schema: any = {
  name: 'getCurrentWeather',
  description: 'Gets the current weather',
  parameters: {
    type: 'object',
    properties: {
      location: {
        type: 'string',
        description: 12345,
      },
      unit: { type: 'string', enum: ['celsius', 'fahrenheit'] },
    },
    required: ['location'],
  },
},

const jsonSchema = functionJsonSchema.safeParse(schema);
// Strict parse result: false
console.log('Strict parse result:', jsonSchema.success);

const coercedJsonSchema = coerceFunctionJsonSchema.safeParse(schema);
// Loose parse result: true
console.log('Loose parse result:', coercedJsonSchema.success);
```