import { z } from 'zod';

/**
 * Recursive JSON object schema
 */
export type ObjectJsonSchema = {
  type: 'object',
  properties: Record<string, ValueJsonSchema>,
  description?: string;
}

type RecordJsonSchema = {
  type: 'object',
  additionalProperties: ValueJsonSchema,
  description?: string;
}

type ArrayJsonSchema = {
  type: 'array',
  items: ValueJsonSchema,
  description?: string;
}

const objectJsonSchema: z.ZodType<ObjectJsonSchema> = z.object({
  type: z.literal('object'),
  properties: z.record(z.lazy(() => valueJsonSchema)),
  description: z.string().optional(),
  required: z.array(z.string()).optional(),
});

const recordJsonSchema: z.ZodType<RecordJsonSchema> = z.object({
  type: z.literal('object'),
  additionalProperties: z.lazy(() => valueJsonSchema),
  description: z.string().optional(),
});

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

/**
 * Set of schemas that coerce values into a valid json schema.
 */
const coerceObjectJsonSchema: z.ZodType<ObjectJsonSchema> = z.object({
  type: z.literal('object'),
  properties: z.record(z.lazy(() => coerceValueJsonSchema)),
  description: z.coerce.string().optional(),
  required: z.array(z.coerce.string()).optional().catch([]),
});

const coerceRecordJsonSchema: z.ZodType<RecordJsonSchema>= z.object({
  type: z.literal('object'),
  additionalProperties: z.lazy(() => coerceValueJsonSchema),
  description: z.string().optional(),
});

const coerceArrayJsonSchema: z.ZodType<ArrayJsonSchema> = z.object({
  type: z.literal('array'),
  items: z.lazy(() => coerceValueJsonSchema),
  description: z.coerce.string().optional(),
});

const coerceTupleJsonSchema = z.object({
  type: z.literal('array'),
  prefixItems: z.array(z.coerce.string()),
  description: z.coerce.string().optional(),
});

const coerceStringJsonSchema = z.object({
  type: z.literal('string'),
  enum: z.array(z.string()).optional(),
  description: z.coerce.string().optional(),
});

const coerceNumberJsonSchema = z.object({
  type: z.union([z.literal('number'), z.literal('integer')]),
  description: z.coerce.string().optional(),
  minimum: z.number().optional(),
  maximum: z.number().optional(),
});

const coerceBooleanJsonSchema = z.object({
  type: z.literal('boolean'),
  description: z.coerce.string().optional(),
});

const coerceUnionJsonSchema = z.object({
  type: z.array(z.coerce.string()),
  description: z.coerce.string().optional(),
});

const coerceRealUnionJsonSchema: z.ZodType<RealUnionJsonSchema>  = z.object({
  anyOf: z.array(z.lazy(() => valueJsonSchema)),
  description: z.coerce.string().optional(),
});

const coerceUnknownJsonSchema = z.object({
  type: z.literal('unknown'),
  description: z.coerce.string().optional(),
});

const coerceNullJsonSchema = z.object({
  type: z.literal('null'),
  description: z.coerce.string().optional(),
});

const coerceRefJsonSchema = z.object({
  $ref: z.string(),
  description: z.coerce.string().optional(),
});

const coerceValueJsonSchema = z.union([
  coerceObjectJsonSchema,
  coerceRecordJsonSchema,
  coerceArrayJsonSchema,
  coerceTupleJsonSchema,
  coerceStringJsonSchema,
  coerceNumberJsonSchema,
  coerceBooleanJsonSchema,
  coerceUnionJsonSchema,
  coerceRealUnionJsonSchema,
  coerceUnknownJsonSchema,
  coerceNullJsonSchema,
  coerceRefJsonSchema,
]);

/**
 * Coerces object into function json schema.
 * Defaults values for bad fields when possible.
 */
export const coerceFunctionJsonSchema = z.object({
  name: z.string(),
  description: z.coerce.string(),
  parameters: z.object({
    type: z.literal('object').transform(() => 'object' as const),
    properties: z.record(
      coerceValueJsonSchema.catch({ type: 'unknown', description: '' }),
    ).catch({}),
    description: z.string().optional().catch(undefined),
    required: z.array(z.string()).optional().catch(undefined),
  }).passthrough(),
  returns: coerceValueJsonSchema.catch({ type: 'unknown', description: '' }),
}).passthrough();
export type CoercedFunctionJson = z.infer<typeof coerceFunctionJsonSchema>;


// Helper types for compile time type tests
type Expect<T extends true> = T;
type Extends<DERIVED_VALUE, VALUE> = DERIVED_VALUE extends VALUE
  ? true
  : false;

// Expect CoercedFunctionJson to fit into FunctionJson
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Test1 = Expect<Extends<CoercedFunctionJson, FunctionJson>>;
