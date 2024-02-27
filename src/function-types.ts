import { z } from 'zod';

/**
 * Recursive JSON object schema
 */
export type ObjectJsonSchema = {
  type: 'object',
  properties: Record<string, ValueJsonSchema>,
  description?: string;
}
const objectJsonSchema: z.ZodType<ObjectJsonSchema> = z.object({
  type: z.literal('object'),
  properties: z.record(z.lazy(() => valueJsonSchema)),
  description: z.string().optional(),
  required: z.array(z.string()).optional(),
});

type RecordJsonSchema = {
  type: 'object',
  additionalProperties: ValueJsonSchema,
  description?: string;
}
const recordJsonSchema: z.ZodType<RecordJsonSchema> = z.object({
  type: z.literal('object'),
  additionalProperties: z.lazy(() => valueJsonSchema),
  description: z.string().optional(),
});

type ArrayJsonSchema = {
  type: 'array',
  items: ValueJsonSchema,
  description?: string;
}
const arrayJsonSchema: z.ZodType<ArrayJsonSchema>  = z.object({
  type: z.literal('array'),
  items: z.lazy(() => valueJsonSchema),
  description: z.string().optional(),
});

const tupleJsonSchema = z.object({
  type: z.literal('array'),
  prefixItems: z.array(z.string()),
  description: z.string().optional(),
});

const stringJsonSchema = z.object({
  type: z.literal('string'),
  enum: z.array(z.string()).optional(),
  description: z.string().optional(),
});

const numberJsonSchema = z.object({
  type: z.union([z.literal('number'), z.literal('integer')]),
  description: z.string().optional(),
  minimum: z.number().optional(),
  maximum: z.number().optional(),
});

const booleanJsonSchema = z.object({
  type: z.literal('boolean'),
  description: z.string().optional(),
});

/**
 * This is not the real way to represent union types in JSON Schema.
 * The real way sucks.
 */
const unionJsonSchema = z.object({
  type: z.array(z.string()),
  description: z.string().optional(),
});

type RealUnionJsonSchema = {
  anyOf: ValueJsonSchema[],
  description?: string;
}
/**
 * The real way to represent unions
 */
const realUnionJsonSchema: z.ZodType<RealUnionJsonSchema>  = z.object({
  anyOf: z.array(z.lazy(() => valueJsonSchema)),
  description: z.string().optional(),
});

const unknownJsonSchema = z.object({
  type: z.literal('unknown'),
  description: z.string().optional(),
});

const nullJsonSchema = z.object({
  type: z.literal('null'),
  description: z.string().optional(),
});

const refJsonSchema = z.object({
  $ref: z.string(),
  description: z.string().optional(),
});

const valueJsonSchema = z.union([
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
  refJsonSchema,
]);
export type ValueJsonSchema = z.infer<typeof valueJsonSchema>;

/**
 * OpenAI function json schema
 */
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
export type FunctionJson = z.infer<typeof functionJsonSchema>;

export const nullFunctionJson: FunctionJson = {
  name: '',
  description: '',
  parameters: [],
  returns: { type: 'null' },
};
