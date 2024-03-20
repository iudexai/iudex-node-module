import OpenAI from 'openai';
import { z } from 'zod';

/**
 * For simple text responses
 */
declare const chatTextSchema: z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"text">;
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "text";
    id: string;
    sender: string;
    timestamp: string;
    text: string;
}, {
    type: "text";
    id: string;
    sender: string;
    timestamp: string;
    text: string;
}>;
type ChatText = z.infer<typeof chatTextSchema>;
declare const chatFunctionCallSchema: z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"functionCall">;
    functionCallId: z.ZodString;
    functionName: z.ZodString;
    functionArgs: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    type: "functionCall";
    id: string;
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionName: string;
    functionArgs: Record<string, unknown>;
}, {
    type: "functionCall";
    id: string;
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionName: string;
    functionArgs: Record<string, unknown>;
}>;
type ChatFunctionCall = z.infer<typeof chatFunctionCallSchema>;
declare const chatFunctionReturnSchema: z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"functionReturn">;
    functionCallId: z.ZodString;
    functionReturn: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "functionReturn";
    id: string;
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionReturn: string;
}, {
    type: "functionReturn";
    id: string;
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionReturn: string;
}>;
type ChatFunctionReturn = z.infer<typeof chatFunctionReturnSchema>;
/**
 * All chat turn types. Put new chat turn types here.
 */
declare const chatTurnSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"text">;
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "text";
    id: string;
    sender: string;
    timestamp: string;
    text: string;
}, {
    type: "text";
    id: string;
    sender: string;
    timestamp: string;
    text: string;
}>, z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"error">;
    name: z.ZodString;
    message: z.ZodString;
    cause: z.ZodOptional<z.ZodString>;
    stack: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "error";
    id: string;
    sender: string;
    timestamp: string;
    message: string;
    name: string;
    cause?: string | undefined;
    stack?: string | undefined;
}, {
    type: "error";
    id: string;
    sender: string;
    timestamp: string;
    message: string;
    name: string;
    cause?: string | undefined;
    stack?: string | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"image">;
    image: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "image";
    id: string;
    sender: string;
    timestamp: string;
    image: string;
    description: string;
}, {
    type: "image";
    id: string;
    sender: string;
    timestamp: string;
    image: string;
    description: string;
}>, z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"list">;
    list: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    type: "list";
    id: string;
    sender: string;
    timestamp: string;
    list: string[];
}, {
    type: "list";
    id: string;
    sender: string;
    timestamp: string;
    list: string[];
}>, z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"functionCall">;
    functionCallId: z.ZodString;
    functionName: z.ZodString;
    functionArgs: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    type: "functionCall";
    id: string;
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionName: string;
    functionArgs: Record<string, unknown>;
}, {
    type: "functionCall";
    id: string;
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionName: string;
    functionArgs: Record<string, unknown>;
}>, z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"functionReturn">;
    functionCallId: z.ZodString;
    functionReturn: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "functionReturn";
    id: string;
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionReturn: string;
}, {
    type: "functionReturn";
    id: string;
    sender: string;
    timestamp: string;
    functionCallId: string;
    functionReturn: string;
}>]>;
type ChatTurn = z.infer<typeof chatTurnSchema>;

type ReturnFunctionCallBody = Pick<ChatFunctionReturn, 'functionCallId' | 'functionReturn'>;
type ReturnFunctionCallRes = {
    workflowId: string;
    message: string;
};
declare function returnFunctionCall(baseUrl: string, apiKey: string): (functionCallId: string, functionReturn: string) => Promise<void>;
type NextMessageRes = ChatFunctionCall | ChatText | undefined;
declare function nextMessage(baseUrl: string, apiKey: string): (workflowId: string) => Promise<NextMessageRes>;
type StartWorkflowRes = {
    workflowId: string;
    message: string;
};
declare function startWorkflow(baseUrl: string, apiKey: string): (query: string, modules?: string) => Promise<StartWorkflowRes>;
type FunctionJson$1 = {
    name: string;
    description?: string;
    parameters?: Record<string, any>;
    returns?: Record<string, any>;
    usageExample?: string;
    returnsExample?: string;
};
type putFunctionJsonsReq = {
    jsons: FunctionJson$1[];
    module?: string;
};
declare function putFunctionJsons(baseUrl: string, apiKey: string): (jsons: FunctionJson$1[], module?: string) => Promise<void>;

/**
 * Recursive JSON object schema
 */
type ObjectJsonSchema = {
    type: 'object';
    properties: Record<string, ValueJsonSchema>;
    description?: string;
};
type RecordJsonSchema = {
    type: 'object';
    additionalProperties: ValueJsonSchema;
    description?: string;
};
type ArrayJsonSchema = {
    type: 'array';
    items: ValueJsonSchema;
    description?: string;
};
type RealUnionJsonSchema = {
    anyOf: ValueJsonSchema[];
    description?: string;
};
declare const valueJsonSchema: z.ZodUnion<[z.ZodType<ObjectJsonSchema, z.ZodTypeDef, ObjectJsonSchema>, z.ZodType<RecordJsonSchema, z.ZodTypeDef, RecordJsonSchema>, z.ZodType<ArrayJsonSchema, z.ZodTypeDef, ArrayJsonSchema>, z.ZodObject<{
    type: z.ZodLiteral<"array">;
    prefixItems: z.ZodArray<z.ZodString, "many">;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "array";
    prefixItems: string[];
    description?: string | undefined;
}, {
    type: "array";
    prefixItems: string[];
    description?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"string">;
    enum: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "string";
    enum?: string[] | undefined;
    description?: string | undefined;
}, {
    type: "string";
    enum?: string[] | undefined;
    description?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodUnion<[z.ZodLiteral<"number">, z.ZodLiteral<"integer">]>;
    description: z.ZodOptional<z.ZodString>;
    minimum: z.ZodOptional<z.ZodNumber>;
    maximum: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type: "number" | "integer";
    description?: string | undefined;
    minimum?: number | undefined;
    maximum?: number | undefined;
}, {
    type: "number" | "integer";
    description?: string | undefined;
    minimum?: number | undefined;
    maximum?: number | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"boolean">;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "boolean";
    description?: string | undefined;
}, {
    type: "boolean";
    description?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodArray<z.ZodString, "many">;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: string[];
    description?: string | undefined;
}, {
    type: string[];
    description?: string | undefined;
}>, z.ZodType<RealUnionJsonSchema, z.ZodTypeDef, RealUnionJsonSchema>, z.ZodObject<{
    type: z.ZodLiteral<"unknown">;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "unknown";
    description?: string | undefined;
}, {
    type: "unknown";
    description?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"null">;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "null";
    description?: string | undefined;
}, {
    type: "null";
    description?: string | undefined;
}>, z.ZodObject<{
    $ref: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    $ref: string;
    description?: string | undefined;
}, {
    $ref: string;
    description?: string | undefined;
}>]>;
type ValueJsonSchema = z.infer<typeof valueJsonSchema>;
/**
 * OpenAI function json schema
 */
declare const functionJsonSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    parameters: z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<"object">;
        properties: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodType<ObjectJsonSchema, z.ZodTypeDef, ObjectJsonSchema>, z.ZodType<RecordJsonSchema, z.ZodTypeDef, RecordJsonSchema>, z.ZodType<ArrayJsonSchema, z.ZodTypeDef, ArrayJsonSchema>, z.ZodObject<{
            type: z.ZodLiteral<"array">;
            prefixItems: z.ZodArray<z.ZodString, "many">;
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "array";
            prefixItems: string[];
            description?: string | undefined;
        }, {
            type: "array";
            prefixItems: string[];
            description?: string | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"string">;
            enum: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "string";
            enum?: string[] | undefined;
            description?: string | undefined;
        }, {
            type: "string";
            enum?: string[] | undefined;
            description?: string | undefined;
        }>, z.ZodObject<{
            type: z.ZodUnion<[z.ZodLiteral<"number">, z.ZodLiteral<"integer">]>;
            description: z.ZodOptional<z.ZodString>;
            minimum: z.ZodOptional<z.ZodNumber>;
            maximum: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type: "number" | "integer";
            description?: string | undefined;
            minimum?: number | undefined;
            maximum?: number | undefined;
        }, {
            type: "number" | "integer";
            description?: string | undefined;
            minimum?: number | undefined;
            maximum?: number | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"boolean">;
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "boolean";
            description?: string | undefined;
        }, {
            type: "boolean";
            description?: string | undefined;
        }>, z.ZodObject<{
            type: z.ZodArray<z.ZodString, "many">;
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: string[];
            description?: string | undefined;
        }, {
            type: string[];
            description?: string | undefined;
        }>, z.ZodType<RealUnionJsonSchema, z.ZodTypeDef, RealUnionJsonSchema>, z.ZodObject<{
            type: z.ZodLiteral<"unknown">;
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "unknown";
            description?: string | undefined;
        }, {
            type: "unknown";
            description?: string | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"null">;
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "null";
            description?: string | undefined;
        }, {
            type: "null";
            description?: string | undefined;
        }>, z.ZodObject<{
            $ref: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            $ref: string;
            description?: string | undefined;
        }, {
            $ref: string;
            description?: string | undefined;
        }>]>>;
        description: z.ZodOptional<z.ZodString>;
        required: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: "object";
        properties: Record<string, ObjectJsonSchema | RecordJsonSchema | ArrayJsonSchema | {
            type: "array";
            prefixItems: string[];
            description?: string | undefined;
        } | {
            type: "string";
            enum?: string[] | undefined;
            description?: string | undefined;
        } | {
            type: "number" | "integer";
            description?: string | undefined;
            minimum?: number | undefined;
            maximum?: number | undefined;
        } | {
            type: "boolean";
            description?: string | undefined;
        } | {
            type: string[];
            description?: string | undefined;
        } | RealUnionJsonSchema | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "null";
            description?: string | undefined;
        } | {
            $ref: string;
            description?: string | undefined;
        }>;
        description?: string | undefined;
        required?: string[] | undefined;
    }, {
        type: "object";
        properties: Record<string, ObjectJsonSchema | RecordJsonSchema | ArrayJsonSchema | {
            type: "array";
            prefixItems: string[];
            description?: string | undefined;
        } | {
            type: "string";
            enum?: string[] | undefined;
            description?: string | undefined;
        } | {
            type: "number" | "integer";
            description?: string | undefined;
            minimum?: number | undefined;
            maximum?: number | undefined;
        } | {
            type: "boolean";
            description?: string | undefined;
        } | {
            type: string[];
            description?: string | undefined;
        } | RealUnionJsonSchema | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "null";
            description?: string | undefined;
        } | {
            $ref: string;
            description?: string | undefined;
        }>;
        description?: string | undefined;
        required?: string[] | undefined;
    }>, z.ZodArray<z.ZodUnion<[z.ZodType<ObjectJsonSchema, z.ZodTypeDef, ObjectJsonSchema>, z.ZodType<RecordJsonSchema, z.ZodTypeDef, RecordJsonSchema>, z.ZodType<ArrayJsonSchema, z.ZodTypeDef, ArrayJsonSchema>, z.ZodObject<{
        type: z.ZodLiteral<"array">;
        prefixItems: z.ZodArray<z.ZodString, "many">;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    }, {
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"string">;
        enum: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "string";
        enum?: string[] | undefined;
        description?: string | undefined;
    }, {
        type: "string";
        enum?: string[] | undefined;
        description?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<"number">, z.ZodLiteral<"integer">]>;
        description: z.ZodOptional<z.ZodString>;
        minimum: z.ZodOptional<z.ZodNumber>;
        maximum: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: "number" | "integer";
        description?: string | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
    }, {
        type: "number" | "integer";
        description?: string | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"boolean">;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "boolean";
        description?: string | undefined;
    }, {
        type: "boolean";
        description?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodArray<z.ZodString, "many">;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: string[];
        description?: string | undefined;
    }, {
        type: string[];
        description?: string | undefined;
    }>, z.ZodType<RealUnionJsonSchema, z.ZodTypeDef, RealUnionJsonSchema>, z.ZodObject<{
        type: z.ZodLiteral<"unknown">;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "unknown";
        description?: string | undefined;
    }, {
        type: "unknown";
        description?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"null">;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "null";
        description?: string | undefined;
    }, {
        type: "null";
        description?: string | undefined;
    }>, z.ZodObject<{
        $ref: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        $ref: string;
        description?: string | undefined;
    }, {
        $ref: string;
        description?: string | undefined;
    }>]>, "many">]>;
    returns: z.ZodUnion<[z.ZodType<ObjectJsonSchema, z.ZodTypeDef, ObjectJsonSchema>, z.ZodType<RecordJsonSchema, z.ZodTypeDef, RecordJsonSchema>, z.ZodType<ArrayJsonSchema, z.ZodTypeDef, ArrayJsonSchema>, z.ZodObject<{
        type: z.ZodLiteral<"array">;
        prefixItems: z.ZodArray<z.ZodString, "many">;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    }, {
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"string">;
        enum: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "string";
        enum?: string[] | undefined;
        description?: string | undefined;
    }, {
        type: "string";
        enum?: string[] | undefined;
        description?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<"number">, z.ZodLiteral<"integer">]>;
        description: z.ZodOptional<z.ZodString>;
        minimum: z.ZodOptional<z.ZodNumber>;
        maximum: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: "number" | "integer";
        description?: string | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
    }, {
        type: "number" | "integer";
        description?: string | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"boolean">;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "boolean";
        description?: string | undefined;
    }, {
        type: "boolean";
        description?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodArray<z.ZodString, "many">;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: string[];
        description?: string | undefined;
    }, {
        type: string[];
        description?: string | undefined;
    }>, z.ZodType<RealUnionJsonSchema, z.ZodTypeDef, RealUnionJsonSchema>, z.ZodObject<{
        type: z.ZodLiteral<"unknown">;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "unknown";
        description?: string | undefined;
    }, {
        type: "unknown";
        description?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"null">;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "null";
        description?: string | undefined;
    }, {
        type: "null";
        description?: string | undefined;
    }>, z.ZodObject<{
        $ref: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        $ref: string;
        description?: string | undefined;
    }, {
        $ref: string;
        description?: string | undefined;
    }>]>;
    usageExample: z.ZodOptional<z.ZodString>;
    returnsExample: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    parameters: ({
        type: "object";
        properties: Record<string, ObjectJsonSchema | RecordJsonSchema | ArrayJsonSchema | {
            type: "array";
            prefixItems: string[];
            description?: string | undefined;
        } | {
            type: "string";
            enum?: string[] | undefined;
            description?: string | undefined;
        } | {
            type: "number" | "integer";
            description?: string | undefined;
            minimum?: number | undefined;
            maximum?: number | undefined;
        } | {
            type: "boolean";
            description?: string | undefined;
        } | {
            type: string[];
            description?: string | undefined;
        } | RealUnionJsonSchema | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "null";
            description?: string | undefined;
        } | {
            $ref: string;
            description?: string | undefined;
        }>;
        description?: string | undefined;
        required?: string[] | undefined;
    } | (ObjectJsonSchema | RecordJsonSchema | ArrayJsonSchema | {
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    } | {
        type: "string";
        enum?: string[] | undefined;
        description?: string | undefined;
    } | {
        type: "number" | "integer";
        description?: string | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
    } | {
        type: "boolean";
        description?: string | undefined;
    } | {
        type: string[];
        description?: string | undefined;
    } | RealUnionJsonSchema | {
        type: "unknown";
        description?: string | undefined;
    } | {
        type: "null";
        description?: string | undefined;
    } | {
        $ref: string;
        description?: string | undefined;
    })[]) & ({
        type: "object";
        properties: Record<string, ObjectJsonSchema | RecordJsonSchema | ArrayJsonSchema | {
            type: "array";
            prefixItems: string[];
            description?: string | undefined;
        } | {
            type: "string";
            enum?: string[] | undefined;
            description?: string | undefined;
        } | {
            type: "number" | "integer";
            description?: string | undefined;
            minimum?: number | undefined;
            maximum?: number | undefined;
        } | {
            type: "boolean";
            description?: string | undefined;
        } | {
            type: string[];
            description?: string | undefined;
        } | RealUnionJsonSchema | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "null";
            description?: string | undefined;
        } | {
            $ref: string;
            description?: string | undefined;
        }>;
        description?: string | undefined;
        required?: string[] | undefined;
    } | (ObjectJsonSchema | RecordJsonSchema | ArrayJsonSchema | {
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    } | {
        type: "string";
        enum?: string[] | undefined;
        description?: string | undefined;
    } | {
        type: "number" | "integer";
        description?: string | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
    } | {
        type: "boolean";
        description?: string | undefined;
    } | {
        type: string[];
        description?: string | undefined;
    } | RealUnionJsonSchema | {
        type: "unknown";
        description?: string | undefined;
    } | {
        type: "null";
        description?: string | undefined;
    } | {
        $ref: string;
        description?: string | undefined;
    })[] | undefined);
    returns: ObjectJsonSchema | RecordJsonSchema | ArrayJsonSchema | {
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    } | {
        type: "string";
        enum?: string[] | undefined;
        description?: string | undefined;
    } | {
        type: "number" | "integer";
        description?: string | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
    } | {
        type: "boolean";
        description?: string | undefined;
    } | {
        type: string[];
        description?: string | undefined;
    } | RealUnionJsonSchema | {
        type: "unknown";
        description?: string | undefined;
    } | {
        type: "null";
        description?: string | undefined;
    } | {
        $ref: string;
        description?: string | undefined;
    } | (ObjectJsonSchema & RecordJsonSchema) | (ObjectJsonSchema & {
        type: string[];
        description?: string | undefined;
    }) | (ObjectJsonSchema & RealUnionJsonSchema) | (ObjectJsonSchema & {
        $ref: string;
        description?: string | undefined;
    }) | (RecordJsonSchema & ObjectJsonSchema) | (RecordJsonSchema & {
        type: string[];
        description?: string | undefined;
    }) | (RecordJsonSchema & RealUnionJsonSchema) | (RecordJsonSchema & {
        $ref: string;
        description?: string | undefined;
    }) | (ArrayJsonSchema & {
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    }) | (ArrayJsonSchema & {
        type: string[];
        description?: string | undefined;
    }) | (ArrayJsonSchema & RealUnionJsonSchema) | (ArrayJsonSchema & {
        $ref: string;
        description?: string | undefined;
    }) | ({
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    } & ArrayJsonSchema) | ({
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    } & {
        type: string[];
        description?: string | undefined;
    }) | ({
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    } & RealUnionJsonSchema) | ({
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    } & {
        $ref: string;
        description?: string | undefined;
    }) | ({
        type: "string";
        enum?: string[] | undefined;
        description?: string | undefined;
    } & {
        type: string[];
        description?: string | undefined;
    }) | ({
        type: "string";
        enum?: string[] | undefined;
        description?: string | undefined;
    } & RealUnionJsonSchema) | ({
        type: "string";
        enum?: string[] | undefined;
        description?: string | undefined;
    } & {
        $ref: string;
        description?: string | undefined;
    }) | ({
        type: "number" | "integer";
        description?: string | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
    } & {
        type: string[];
        description?: string | undefined;
    }) | ({
        type: "number" | "integer";
        description?: string | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
    } & RealUnionJsonSchema) | ({
        type: "number" | "integer";
        description?: string | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
    } & {
        $ref: string;
        description?: string | undefined;
    }) | ({
        type: "boolean";
        description?: string | undefined;
    } & {
        type: string[];
        description?: string | undefined;
    }) | ({
        type: "boolean";
        description?: string | undefined;
    } & RealUnionJsonSchema) | ({
        type: "boolean";
        description?: string | undefined;
    } & {
        $ref: string;
        description?: string | undefined;
    }) | ({
        type: string[];
        description?: string | undefined;
    } & ObjectJsonSchema) | ({
        type: string[];
        description?: string | undefined;
    } & RecordJsonSchema) | ({
        type: string[];
        description?: string | undefined;
    } & ArrayJsonSchema) | ({
        type: string[];
        description?: string | undefined;
    } & {
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    }) | ({
        type: string[];
        description?: string | undefined;
    } & {
        type: "string";
        enum?: string[] | undefined;
        description?: string | undefined;
    }) | ({
        type: string[];
        description?: string | undefined;
    } & {
        type: "number" | "integer";
        description?: string | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
    }) | ({
        type: string[];
        description?: string | undefined;
    } & {
        type: "boolean";
        description?: string | undefined;
    }) | ({
        type: string[];
        description?: string | undefined;
    } & RealUnionJsonSchema) | ({
        type: string[];
        description?: string | undefined;
    } & {
        type: "unknown";
        description?: string | undefined;
    }) | ({
        type: string[];
        description?: string | undefined;
    } & {
        type: "null";
        description?: string | undefined;
    }) | ({
        type: string[];
        description?: string | undefined;
    } & {
        $ref: string;
        description?: string | undefined;
    }) | (RealUnionJsonSchema & ObjectJsonSchema) | (RealUnionJsonSchema & RecordJsonSchema) | (RealUnionJsonSchema & ArrayJsonSchema) | (RealUnionJsonSchema & {
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    }) | (RealUnionJsonSchema & {
        type: "string";
        enum?: string[] | undefined;
        description?: string | undefined;
    }) | (RealUnionJsonSchema & {
        type: "number" | "integer";
        description?: string | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
    }) | (RealUnionJsonSchema & {
        type: "boolean";
        description?: string | undefined;
    }) | (RealUnionJsonSchema & {
        type: string[];
        description?: string | undefined;
    }) | (RealUnionJsonSchema & {
        type: "unknown";
        description?: string | undefined;
    }) | (RealUnionJsonSchema & {
        type: "null";
        description?: string | undefined;
    }) | (RealUnionJsonSchema & {
        $ref: string;
        description?: string | undefined;
    }) | ({
        type: "unknown";
        description?: string | undefined;
    } & {
        type: string[];
        description?: string | undefined;
    }) | ({
        type: "unknown";
        description?: string | undefined;
    } & RealUnionJsonSchema) | ({
        type: "unknown";
        description?: string | undefined;
    } & {
        $ref: string;
        description?: string | undefined;
    }) | ({
        type: "null";
        description?: string | undefined;
    } & {
        type: string[];
        description?: string | undefined;
    }) | ({
        type: "null";
        description?: string | undefined;
    } & RealUnionJsonSchema) | ({
        type: "null";
        description?: string | undefined;
    } & {
        $ref: string;
        description?: string | undefined;
    }) | ({
        $ref: string;
        description?: string | undefined;
    } & ObjectJsonSchema) | ({
        $ref: string;
        description?: string | undefined;
    } & RecordJsonSchema) | ({
        $ref: string;
        description?: string | undefined;
    } & ArrayJsonSchema) | ({
        $ref: string;
        description?: string | undefined;
    } & {
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    }) | ({
        $ref: string;
        description?: string | undefined;
    } & {
        type: "string";
        enum?: string[] | undefined;
        description?: string | undefined;
    }) | ({
        $ref: string;
        description?: string | undefined;
    } & {
        type: "number" | "integer";
        description?: string | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
    }) | ({
        $ref: string;
        description?: string | undefined;
    } & {
        type: "boolean";
        description?: string | undefined;
    }) | ({
        $ref: string;
        description?: string | undefined;
    } & {
        type: string[];
        description?: string | undefined;
    }) | ({
        $ref: string;
        description?: string | undefined;
    } & RealUnionJsonSchema) | ({
        $ref: string;
        description?: string | undefined;
    } & {
        type: "unknown";
        description?: string | undefined;
    }) | ({
        $ref: string;
        description?: string | undefined;
    } & {
        type: "null";
        description?: string | undefined;
    });
    usageExample?: string | undefined;
    returnsExample?: string | undefined;
}, {
    name: string;
    description: string;
    parameters: ({
        type: "object";
        properties: Record<string, ObjectJsonSchema | RecordJsonSchema | ArrayJsonSchema | {
            type: "array";
            prefixItems: string[];
            description?: string | undefined;
        } | {
            type: "string";
            enum?: string[] | undefined;
            description?: string | undefined;
        } | {
            type: "number" | "integer";
            description?: string | undefined;
            minimum?: number | undefined;
            maximum?: number | undefined;
        } | {
            type: "boolean";
            description?: string | undefined;
        } | {
            type: string[];
            description?: string | undefined;
        } | RealUnionJsonSchema | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "null";
            description?: string | undefined;
        } | {
            $ref: string;
            description?: string | undefined;
        }>;
        description?: string | undefined;
        required?: string[] | undefined;
    } | (ObjectJsonSchema | RecordJsonSchema | ArrayJsonSchema | {
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    } | {
        type: "string";
        enum?: string[] | undefined;
        description?: string | undefined;
    } | {
        type: "number" | "integer";
        description?: string | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
    } | {
        type: "boolean";
        description?: string | undefined;
    } | {
        type: string[];
        description?: string | undefined;
    } | RealUnionJsonSchema | {
        type: "unknown";
        description?: string | undefined;
    } | {
        type: "null";
        description?: string | undefined;
    } | {
        $ref: string;
        description?: string | undefined;
    })[]) & ({
        type: "object";
        properties: Record<string, ObjectJsonSchema | RecordJsonSchema | ArrayJsonSchema | {
            type: "array";
            prefixItems: string[];
            description?: string | undefined;
        } | {
            type: "string";
            enum?: string[] | undefined;
            description?: string | undefined;
        } | {
            type: "number" | "integer";
            description?: string | undefined;
            minimum?: number | undefined;
            maximum?: number | undefined;
        } | {
            type: "boolean";
            description?: string | undefined;
        } | {
            type: string[];
            description?: string | undefined;
        } | RealUnionJsonSchema | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "null";
            description?: string | undefined;
        } | {
            $ref: string;
            description?: string | undefined;
        }>;
        description?: string | undefined;
        required?: string[] | undefined;
    } | (ObjectJsonSchema | RecordJsonSchema | ArrayJsonSchema | {
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    } | {
        type: "string";
        enum?: string[] | undefined;
        description?: string | undefined;
    } | {
        type: "number" | "integer";
        description?: string | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
    } | {
        type: "boolean";
        description?: string | undefined;
    } | {
        type: string[];
        description?: string | undefined;
    } | RealUnionJsonSchema | {
        type: "unknown";
        description?: string | undefined;
    } | {
        type: "null";
        description?: string | undefined;
    } | {
        $ref: string;
        description?: string | undefined;
    })[] | undefined);
    returns: ObjectJsonSchema | RecordJsonSchema | ArrayJsonSchema | {
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    } | {
        type: "string";
        enum?: string[] | undefined;
        description?: string | undefined;
    } | {
        type: "number" | "integer";
        description?: string | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
    } | {
        type: "boolean";
        description?: string | undefined;
    } | {
        type: string[];
        description?: string | undefined;
    } | RealUnionJsonSchema | {
        type: "unknown";
        description?: string | undefined;
    } | {
        type: "null";
        description?: string | undefined;
    } | {
        $ref: string;
        description?: string | undefined;
    } | (ObjectJsonSchema & RecordJsonSchema) | (ObjectJsonSchema & RealUnionJsonSchema) | (RecordJsonSchema & ObjectJsonSchema) | (RecordJsonSchema & RealUnionJsonSchema) | (ArrayJsonSchema & RealUnionJsonSchema) | (RealUnionJsonSchema & ObjectJsonSchema) | (RealUnionJsonSchema & RecordJsonSchema) | (RealUnionJsonSchema & ArrayJsonSchema) | (ObjectJsonSchema & {
        type: string[];
        description?: string | undefined;
    }) | (ObjectJsonSchema & {
        $ref: string;
        description?: string | undefined;
    }) | (RecordJsonSchema & {
        type: string[];
        description?: string | undefined;
    }) | (RecordJsonSchema & {
        $ref: string;
        description?: string | undefined;
    }) | (ArrayJsonSchema & {
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    }) | (ArrayJsonSchema & {
        type: string[];
        description?: string | undefined;
    }) | (ArrayJsonSchema & {
        $ref: string;
        description?: string | undefined;
    }) | ({
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    } & ArrayJsonSchema) | ({
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    } & {
        type: string[];
        description?: string | undefined;
    }) | ({
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    } & RealUnionJsonSchema) | ({
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    } & {
        $ref: string;
        description?: string | undefined;
    }) | ({
        type: "string";
        enum?: string[] | undefined;
        description?: string | undefined;
    } & {
        type: string[];
        description?: string | undefined;
    }) | ({
        type: "string";
        enum?: string[] | undefined;
        description?: string | undefined;
    } & RealUnionJsonSchema) | ({
        type: "string";
        enum?: string[] | undefined;
        description?: string | undefined;
    } & {
        $ref: string;
        description?: string | undefined;
    }) | ({
        type: "number" | "integer";
        description?: string | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
    } & {
        type: string[];
        description?: string | undefined;
    }) | ({
        type: "number" | "integer";
        description?: string | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
    } & RealUnionJsonSchema) | ({
        type: "number" | "integer";
        description?: string | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
    } & {
        $ref: string;
        description?: string | undefined;
    }) | ({
        type: "boolean";
        description?: string | undefined;
    } & {
        type: string[];
        description?: string | undefined;
    }) | ({
        type: "boolean";
        description?: string | undefined;
    } & RealUnionJsonSchema) | ({
        type: "boolean";
        description?: string | undefined;
    } & {
        $ref: string;
        description?: string | undefined;
    }) | ({
        type: string[];
        description?: string | undefined;
    } & ObjectJsonSchema) | ({
        type: string[];
        description?: string | undefined;
    } & RecordJsonSchema) | ({
        type: string[];
        description?: string | undefined;
    } & ArrayJsonSchema) | ({
        type: string[];
        description?: string | undefined;
    } & {
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    }) | ({
        type: string[];
        description?: string | undefined;
    } & {
        type: "string";
        enum?: string[] | undefined;
        description?: string | undefined;
    }) | ({
        type: string[];
        description?: string | undefined;
    } & {
        type: "number" | "integer";
        description?: string | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
    }) | ({
        type: string[];
        description?: string | undefined;
    } & {
        type: "boolean";
        description?: string | undefined;
    }) | ({
        type: string[];
        description?: string | undefined;
    } & RealUnionJsonSchema) | ({
        type: string[];
        description?: string | undefined;
    } & {
        type: "unknown";
        description?: string | undefined;
    }) | ({
        type: string[];
        description?: string | undefined;
    } & {
        type: "null";
        description?: string | undefined;
    }) | ({
        type: string[];
        description?: string | undefined;
    } & {
        $ref: string;
        description?: string | undefined;
    }) | (RealUnionJsonSchema & {
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    }) | (RealUnionJsonSchema & {
        type: "string";
        enum?: string[] | undefined;
        description?: string | undefined;
    }) | (RealUnionJsonSchema & {
        type: "number" | "integer";
        description?: string | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
    }) | (RealUnionJsonSchema & {
        type: "boolean";
        description?: string | undefined;
    }) | (RealUnionJsonSchema & {
        type: string[];
        description?: string | undefined;
    }) | (RealUnionJsonSchema & {
        type: "unknown";
        description?: string | undefined;
    }) | (RealUnionJsonSchema & {
        type: "null";
        description?: string | undefined;
    }) | (RealUnionJsonSchema & {
        $ref: string;
        description?: string | undefined;
    }) | ({
        type: "unknown";
        description?: string | undefined;
    } & {
        type: string[];
        description?: string | undefined;
    }) | ({
        type: "unknown";
        description?: string | undefined;
    } & RealUnionJsonSchema) | ({
        type: "unknown";
        description?: string | undefined;
    } & {
        $ref: string;
        description?: string | undefined;
    }) | ({
        type: "null";
        description?: string | undefined;
    } & {
        type: string[];
        description?: string | undefined;
    }) | ({
        type: "null";
        description?: string | undefined;
    } & RealUnionJsonSchema) | ({
        type: "null";
        description?: string | undefined;
    } & {
        $ref: string;
        description?: string | undefined;
    }) | ({
        $ref: string;
        description?: string | undefined;
    } & ObjectJsonSchema) | ({
        $ref: string;
        description?: string | undefined;
    } & RecordJsonSchema) | ({
        $ref: string;
        description?: string | undefined;
    } & ArrayJsonSchema) | ({
        $ref: string;
        description?: string | undefined;
    } & {
        type: "array";
        prefixItems: string[];
        description?: string | undefined;
    }) | ({
        $ref: string;
        description?: string | undefined;
    } & {
        type: "string";
        enum?: string[] | undefined;
        description?: string | undefined;
    }) | ({
        $ref: string;
        description?: string | undefined;
    } & {
        type: "number" | "integer";
        description?: string | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
    }) | ({
        $ref: string;
        description?: string | undefined;
    } & {
        type: "boolean";
        description?: string | undefined;
    }) | ({
        $ref: string;
        description?: string | undefined;
    } & {
        type: string[];
        description?: string | undefined;
    }) | ({
        $ref: string;
        description?: string | undefined;
    } & RealUnionJsonSchema) | ({
        $ref: string;
        description?: string | undefined;
    } & {
        type: "unknown";
        description?: string | undefined;
    }) | ({
        $ref: string;
        description?: string | undefined;
    } & {
        type: "null";
        description?: string | undefined;
    });
    usageExample?: string | undefined;
    returnsExample?: string | undefined;
}>;
type FunctionJson = z.infer<typeof functionJsonSchema>;
declare const nullFunctionJson: FunctionJson;

declare const DEFAULT_BASE_URL = "https://api.iudex.ai";
type IudexMessage = ChatTurn;
type ChatCompletionMessageWithIudex = OpenAI.ChatCompletionMessageParam & ({
    tool_call_id?: string;
    workflowId?: string;
} | {
    tool_call_id: string;
    workflowId: string;
});
type ChatCompletionWithIudex = OpenAI.ChatCompletion & {
    choices: Array<OpenAI.ChatCompletion.Choice & {
        message: OpenAI.ChatCompletionMessage & {
            workflowId: string;
        };
    }>;
};
/**
 * Iudex api client.
 */
declare class Iudex {
    baseUrl: string;
    apiKey: string;
    functionLinker?: (fnName: string) => (...args: any[]) => unknown;
    constructor({ apiKey, baseUrl, }?: {
        apiKey?: string;
        baseUrl?: string;
    });
    uploadFunctions: (jsons: Array<OpenAI.ChatCompletionCreateParams.Function | FunctionJson>, modules?: string) => Promise<void>;
    linkFunctions: (functionLinker: (fnName: string) => (...args: any[]) => unknown) => void;
    /**
     * @param message message to send
     * @returns response as a chat object
     */
    sendChatTurn: (message: string, opts?: {
        onChatTurn?: ((c: ChatTurn) => void) | undefined;
    }) => Promise<ChatText>;
    /**
     * @param message message to send
     * @returns response message as a string
     */
    sendMessage: (message: string) => Promise<string>;
    chatCompletionsCreate: (body: OpenAI.ChatCompletionCreateParamsNonStreaming & {
        messages: Array<ChatCompletionMessageWithIudex>;
    }) => Promise<ChatCompletionWithIudex>;
    chat: {
        completions: {
            create: (body: OpenAI.ChatCompletionCreateParamsNonStreaming & {
                messages: Array<ChatCompletionMessageWithIudex>;
            }) => Promise<ChatCompletionWithIudex>;
        };
    };
}
/**
 * Maps IudexMessage to OpenAI.ChatCompletion.
 */
declare function mapIudexToOpenAi(m: IudexMessage, workflowId: string): Omit<ChatCompletionWithIudex, 'model'>;
/**
 * Extracts OpenAI message content as a string.
 */
declare function extractMessageTextContent(content: OpenAI.ChatCompletionUserMessageParam['content']): string;

export { type ChatCompletionMessageWithIudex, type ChatCompletionWithIudex, DEFAULT_BASE_URL, type FunctionJson, Iudex, type IudexMessage, type NextMessageRes, type ObjectJsonSchema, type ReturnFunctionCallBody, type ReturnFunctionCallRes, type StartWorkflowRes, type ValueJsonSchema, Iudex as default, extractMessageTextContent, functionJsonSchema, mapIudexToOpenAi, nextMessage, nullFunctionJson, putFunctionJsons, type putFunctionJsonsReq, returnFunctionCall, startWorkflow };
