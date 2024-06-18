/// <reference types="node" />
import z$1, { z } from 'zod';
import OpenAI from 'openai';
import { FunctionJson as FunctionJson$1 } from 'function-json-schema';
export * from 'function-json-schema';
import { EventEmitter } from 'events';
import { IncomingMessage, ServerResponse } from 'http';
import { WorkerOptions } from 'worker_threads';

declare const chatTurnBaseSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodString;
    sender: z.ZodString;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
    id: string;
    sender: string;
    timestamp: string;
}, {
    type: string;
    id: string;
    sender: string;
    timestamp: string;
}>;
type ChatTurnBase = z.infer<typeof chatTurnBaseSchema>;
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
declare const chatErrorSchema: z.ZodObject<{
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
}>;
type ChatError = z.infer<typeof chatErrorSchema>;
/**
 * For image message.
 * Inspired by https://ogp.me/
 */
declare const chatImageSchema: z.ZodObject<{
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
}>;
type ChatImage = z.infer<typeof chatImageSchema>;
declare const chatListSchema: z.ZodObject<{
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
}>;
type ChatList = z.infer<typeof chatListSchema>;
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
/**
 * String union for all chat turn types.
 */
type ChatTurnType = ChatTurn['type'];
/**
 * ChatTurn base type with unioned type field. The most generic, "all" type.
 */
type ChatTurnUnion = ChatTurnBase & {
    type: ChatTurnType;
};

type AnyFunction = (...args: any[]) => any;
type MappedReturnType<T extends Record<string, AnyFunction>> = {
    [K in keyof T]: ReturnType<T[K]>;
};

declare function createFunctionClient(baseUrl: string, apiKey: string): MappedReturnType<{
    returnFunctionCall: typeof returnFunctionCall;
    nextMessage: typeof nextMessage;
    startWorkflow: typeof startWorkflow;
    putFunctionJsons: typeof putFunctionJsons;
}>;
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
declare function startWorkflow(baseUrl: string, apiKey: string): (query: string, modules?: string[]) => Promise<StartWorkflowRes>;
type FunctionJson = {
    name: string;
    description?: string;
    parameters?: Record<string, any>;
    returns?: Record<string, any>;
    usageExample?: string;
    returnsExample?: string;
};
type putFunctionJsonsReq = {
    jsons: FunctionJson[];
    module?: string;
};
declare function putFunctionJsons(baseUrl: string, apiKey: string): (jsons: FunctionJson[], module?: string) => Promise<void>;

declare const TaskStatus: {
    readonly Pending: "Pending";
    readonly Planning: "Planning";
    readonly Executing: "Executing";
    readonly Sequencing: "Sequencing";
    readonly Resolved: "Resolved";
    readonly Sequenced: "Sequenced";
    readonly Errored: "Errored";
};
type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
declare const TerminalTaskStatuses: readonly ["Resolved", "Sequenced", "Errored"];
declare const baseTaskSchema: z$1.ZodObject<{
    id: z$1.ZodString;
    description: z$1.ZodString;
    status: z$1.ZodNativeEnum<{
        readonly Pending: "Pending";
        readonly Planning: "Planning";
        readonly Executing: "Executing";
        readonly Sequencing: "Sequencing";
        readonly Resolved: "Resolved";
        readonly Sequenced: "Sequenced";
        readonly Errored: "Errored";
    }>;
    stepIndex: z$1.ZodNumber;
    depth: z$1.ZodNumber;
    numRewrites: z$1.ZodNumber;
}, "strip", z$1.ZodTypeAny, {
    id: string;
    status: "Pending" | "Planning" | "Executing" | "Sequencing" | "Resolved" | "Sequenced" | "Errored";
    description: string;
    stepIndex: number;
    depth: number;
    numRewrites: number;
}, {
    id: string;
    status: "Pending" | "Planning" | "Executing" | "Sequencing" | "Resolved" | "Sequenced" | "Errored";
    description: string;
    stepIndex: number;
    depth: number;
    numRewrites: number;
}>;
type BaseTask = z$1.infer<typeof baseTaskSchema>;
declare const Feasibility: {
    readonly Feasible: "Feasible";
    readonly Rewritable: "Rewritable";
    readonly Infeasible: "Infeasible";
};
type Feasibility = (typeof Feasibility)[keyof typeof Feasibility];
declare const feasibilityCheckSchema: z$1.ZodObject<{
    feasibility: z$1.ZodNativeEnum<{
        readonly Feasible: "Feasible";
        readonly Rewritable: "Rewritable";
        readonly Infeasible: "Infeasible";
    }>;
    reason: z$1.ZodString;
    fix: z$1.ZodOptional<z$1.ZodString>;
}, "strip", z$1.ZodTypeAny, {
    feasibility: "Feasible" | "Rewritable" | "Infeasible";
    reason: string;
    fix?: string | undefined;
}, {
    feasibility: "Feasible" | "Rewritable" | "Infeasible";
    reason: string;
    fix?: string | undefined;
}>;
type FeasibilityCheck = z$1.infer<typeof feasibilityCheckSchema>;
declare const Resolution: {
    readonly Resolved: "Resolved";
    readonly Rewritable: "Rewritable";
    readonly Infeasible: "Infeasible";
};
type Resolution = (typeof Resolution)[keyof typeof Resolution];
declare const resolutionCheckSchema: z$1.ZodObject<{
    resolution: z$1.ZodNativeEnum<{
        readonly Resolved: "Resolved";
        readonly Rewritable: "Rewritable";
        readonly Infeasible: "Infeasible";
    }>;
    reason: z$1.ZodString;
    fix: z$1.ZodOptional<z$1.ZodString>;
}, "strip", z$1.ZodTypeAny, {
    reason: string;
    resolution: "Resolved" | "Rewritable" | "Infeasible";
    fix?: string | undefined;
}, {
    reason: string;
    resolution: "Resolved" | "Rewritable" | "Infeasible";
    fix?: string | undefined;
}>;
type ResolutionCheck = z$1.infer<typeof resolutionCheckSchema>;
declare const taskPendingSchema: z$1.ZodObject<{
    id: z$1.ZodString;
    description: z$1.ZodString;
    stepIndex: z$1.ZodNumber;
    depth: z$1.ZodNumber;
    numRewrites: z$1.ZodNumber;
    status: z$1.ZodLiteral<"Pending">;
}, "strip", z$1.ZodTypeAny, {
    id: string;
    status: "Pending";
    description: string;
    stepIndex: number;
    depth: number;
    numRewrites: number;
}, {
    id: string;
    status: "Pending";
    description: string;
    stepIndex: number;
    depth: number;
    numRewrites: number;
}>;
type TaskPending = z$1.infer<typeof taskPendingSchema>;
declare const taskPlanningSchema: z$1.ZodObject<{
    id: z$1.ZodString;
    description: z$1.ZodString;
    stepIndex: z$1.ZodNumber;
    depth: z$1.ZodNumber;
    numRewrites: z$1.ZodNumber;
    status: z$1.ZodLiteral<"Planning">;
    program: z$1.ZodOptional<z$1.ZodString>;
    feasibilityCheck: z$1.ZodOptional<z$1.ZodObject<{
        feasibility: z$1.ZodNativeEnum<{
            readonly Feasible: "Feasible";
            readonly Rewritable: "Rewritable";
            readonly Infeasible: "Infeasible";
        }>;
        reason: z$1.ZodString;
        fix: z$1.ZodOptional<z$1.ZodString>;
    }, "strip", z$1.ZodTypeAny, {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    }, {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    }>>;
    resolutionCheck: z$1.ZodOptional<z$1.ZodObject<{
        resolution: z$1.ZodNativeEnum<{
            readonly Resolved: "Resolved";
            readonly Rewritable: "Rewritable";
            readonly Infeasible: "Infeasible";
        }>;
        reason: z$1.ZodString;
        fix: z$1.ZodOptional<z$1.ZodString>;
    }, "strip", z$1.ZodTypeAny, {
        reason: string;
        resolution: "Resolved" | "Rewritable" | "Infeasible";
        fix?: string | undefined;
    }, {
        reason: string;
        resolution: "Resolved" | "Rewritable" | "Infeasible";
        fix?: string | undefined;
    }>>;
}, "strip", z$1.ZodTypeAny, {
    id: string;
    status: "Planning";
    description: string;
    stepIndex: number;
    depth: number;
    numRewrites: number;
    program?: string | undefined;
    feasibilityCheck?: {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    } | undefined;
    resolutionCheck?: {
        reason: string;
        resolution: "Resolved" | "Rewritable" | "Infeasible";
        fix?: string | undefined;
    } | undefined;
}, {
    id: string;
    status: "Planning";
    description: string;
    stepIndex: number;
    depth: number;
    numRewrites: number;
    program?: string | undefined;
    feasibilityCheck?: {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    } | undefined;
    resolutionCheck?: {
        reason: string;
        resolution: "Resolved" | "Rewritable" | "Infeasible";
        fix?: string | undefined;
    } | undefined;
}>;
type TaskPlanning = z$1.infer<typeof taskPlanningSchema>;
declare const taskExecutingSchema: z$1.ZodObject<{
    id: z$1.ZodString;
    description: z$1.ZodString;
    stepIndex: z$1.ZodNumber;
    depth: z$1.ZodNumber;
    numRewrites: z$1.ZodNumber;
    status: z$1.ZodLiteral<"Executing">;
    program: z$1.ZodString;
    usedFunctionNames: z$1.ZodArray<z$1.ZodString, "many">;
    feasibilityCheck: z$1.ZodObject<{
        feasibility: z$1.ZodNativeEnum<{
            readonly Feasible: "Feasible";
            readonly Rewritable: "Rewritable";
            readonly Infeasible: "Infeasible";
        }>;
        reason: z$1.ZodString;
        fix: z$1.ZodOptional<z$1.ZodString>;
    }, "strip", z$1.ZodTypeAny, {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    }, {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    }>;
}, "strip", z$1.ZodTypeAny, {
    id: string;
    status: "Executing";
    description: string;
    stepIndex: number;
    depth: number;
    numRewrites: number;
    program: string;
    feasibilityCheck: {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    };
    usedFunctionNames: string[];
}, {
    id: string;
    status: "Executing";
    description: string;
    stepIndex: number;
    depth: number;
    numRewrites: number;
    program: string;
    feasibilityCheck: {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    };
    usedFunctionNames: string[];
}>;
type TaskExecuting = z$1.infer<typeof taskExecutingSchema>;
declare const taskResolvedSchema: z$1.ZodObject<{
    id: z$1.ZodString;
    description: z$1.ZodString;
    stepIndex: z$1.ZodNumber;
    depth: z$1.ZodNumber;
    numRewrites: z$1.ZodNumber;
    status: z$1.ZodLiteral<"Resolved">;
    program: z$1.ZodString;
    usedFunctionNames: z$1.ZodArray<z$1.ZodString, "many">;
    feasibilityCheck: z$1.ZodObject<{
        feasibility: z$1.ZodNativeEnum<{
            readonly Feasible: "Feasible";
            readonly Rewritable: "Rewritable";
            readonly Infeasible: "Infeasible";
        }>;
        reason: z$1.ZodString;
        fix: z$1.ZodOptional<z$1.ZodString>;
    }, "strip", z$1.ZodTypeAny, {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    }, {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    }>;
    resolutionCheck: z$1.ZodObject<{
        resolution: z$1.ZodNativeEnum<{
            readonly Resolved: "Resolved";
            readonly Rewritable: "Rewritable";
            readonly Infeasible: "Infeasible";
        }>;
        reason: z$1.ZodString;
        fix: z$1.ZodOptional<z$1.ZodString>;
    }, "strip", z$1.ZodTypeAny, {
        reason: string;
        resolution: "Resolved" | "Rewritable" | "Infeasible";
        fix?: string | undefined;
    }, {
        reason: string;
        resolution: "Resolved" | "Rewritable" | "Infeasible";
        fix?: string | undefined;
    }>;
}, "strip", z$1.ZodTypeAny, {
    id: string;
    status: "Resolved";
    description: string;
    stepIndex: number;
    depth: number;
    numRewrites: number;
    program: string;
    feasibilityCheck: {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    };
    resolutionCheck: {
        reason: string;
        resolution: "Resolved" | "Rewritable" | "Infeasible";
        fix?: string | undefined;
    };
    usedFunctionNames: string[];
}, {
    id: string;
    status: "Resolved";
    description: string;
    stepIndex: number;
    depth: number;
    numRewrites: number;
    program: string;
    feasibilityCheck: {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    };
    resolutionCheck: {
        reason: string;
        resolution: "Resolved" | "Rewritable" | "Infeasible";
        fix?: string | undefined;
    };
    usedFunctionNames: string[];
}>;
type TaskResolved = z$1.infer<typeof taskResolvedSchema>;
declare const taskSequencingSchema: z$1.ZodObject<{
    id: z$1.ZodString;
    description: z$1.ZodString;
    stepIndex: z$1.ZodNumber;
    depth: z$1.ZodNumber;
    numRewrites: z$1.ZodNumber;
    status: z$1.ZodLiteral<"Sequencing">;
    program: z$1.ZodString;
    feasibilityCheck: z$1.ZodObject<{
        feasibility: z$1.ZodNativeEnum<{
            readonly Feasible: "Feasible";
            readonly Rewritable: "Rewritable";
            readonly Infeasible: "Infeasible";
        }>;
        reason: z$1.ZodString;
        fix: z$1.ZodOptional<z$1.ZodString>;
    }, "strip", z$1.ZodTypeAny, {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    }, {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    }>;
    usedFunctionNames: z$1.ZodOptional<z$1.ZodArray<z$1.ZodString, "many">>;
    resolutionCheck: z$1.ZodOptional<z$1.ZodObject<{
        resolution: z$1.ZodNativeEnum<{
            readonly Resolved: "Resolved";
            readonly Rewritable: "Rewritable";
            readonly Infeasible: "Infeasible";
        }>;
        reason: z$1.ZodString;
        fix: z$1.ZodOptional<z$1.ZodString>;
    }, "strip", z$1.ZodTypeAny, {
        reason: string;
        resolution: "Resolved" | "Rewritable" | "Infeasible";
        fix?: string | undefined;
    }, {
        reason: string;
        resolution: "Resolved" | "Rewritable" | "Infeasible";
        fix?: string | undefined;
    }>>;
}, "strip", z$1.ZodTypeAny, {
    id: string;
    status: "Sequencing";
    description: string;
    stepIndex: number;
    depth: number;
    numRewrites: number;
    program: string;
    feasibilityCheck: {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    };
    usedFunctionNames?: string[] | undefined;
    resolutionCheck?: {
        reason: string;
        resolution: "Resolved" | "Rewritable" | "Infeasible";
        fix?: string | undefined;
    } | undefined;
}, {
    id: string;
    status: "Sequencing";
    description: string;
    stepIndex: number;
    depth: number;
    numRewrites: number;
    program: string;
    feasibilityCheck: {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    };
    usedFunctionNames?: string[] | undefined;
    resolutionCheck?: {
        reason: string;
        resolution: "Resolved" | "Rewritable" | "Infeasible";
        fix?: string | undefined;
    } | undefined;
}>;
type TaskSequencing = z$1.infer<typeof taskSequencingSchema>;
type TaskSequenced = z$1.infer<typeof baseTaskSchema> & {
    status: 'Sequenced';
    program: string;
    subtasks: Task[];
    feasibilityCheck: FeasibilityCheck;
    usedFunctionNames?: string[];
    resolutionCheck?: ResolutionCheck;
};
declare const taskSequencedSchema: z$1.ZodType<TaskSequenced>;
declare const taskErroredSchema: z$1.ZodObject<{
    id: z$1.ZodString;
    description: z$1.ZodString;
    stepIndex: z$1.ZodNumber;
    depth: z$1.ZodNumber;
    numRewrites: z$1.ZodNumber;
    status: z$1.ZodLiteral<"Errored">;
    errorMsg: z$1.ZodString;
    errorName: z$1.ZodString;
    errorStack: z$1.ZodOptional<z$1.ZodString>;
}, "strip", z$1.ZodTypeAny, {
    id: string;
    status: "Errored";
    description: string;
    stepIndex: number;
    depth: number;
    numRewrites: number;
    errorMsg: string;
    errorName: string;
    errorStack?: string | undefined;
}, {
    id: string;
    status: "Errored";
    description: string;
    stepIndex: number;
    depth: number;
    numRewrites: number;
    errorMsg: string;
    errorName: string;
    errorStack?: string | undefined;
}>;
type TaskErrored = z$1.infer<typeof taskErroredSchema>;
type Task = TaskPending | TaskPlanning | TaskExecuting | TaskSequencing | TaskSequenced | TaskResolved | TaskErrored;
declare const taskSchema: z$1.ZodType<Task>;
type TaskStatusToType = {
    [TaskStatus.Pending]: TaskPending;
    [TaskStatus.Planning]: TaskPlanning;
    [TaskStatus.Executing]: TaskExecuting;
    [TaskStatus.Sequencing]: TaskSequencing;
    [TaskStatus.Sequenced]: TaskSequenced;
    [TaskStatus.Resolved]: TaskResolved;
    [TaskStatus.Errored]: TaskErrored;
};
type TaskStatusesToType<Statuses> = Statuses extends TaskStatus[] ? Statuses[number] extends TaskStatus ? TaskStatusToType[Statuses[number]] : never : Statuses extends TaskStatus ? TaskStatusToType[Statuses] : never;

declare const getWorkflowsResSchema: z$1.ZodObject<{
    workflowInfos: z$1.ZodArray<z$1.ZodObject<{
        workflowId: z$1.ZodString;
        modules: z$1.ZodOptional<z$1.ZodArray<z$1.ZodString, "many">>;
        createdAt: z$1.ZodString;
        updatedAt: z$1.ZodString;
        description: z$1.ZodString;
        status: z$1.ZodNativeEnum<{
            readonly Running: "Running";
            readonly Completed: "Completed";
            readonly Failed: "Failed";
            readonly Paused: "Paused";
            readonly TimedOut: "TimedOut";
        }>;
        numLeafTasks: z$1.ZodNumber;
    }, "strip", z$1.ZodTypeAny, {
        status: "Running" | "Completed" | "Failed" | "Paused" | "TimedOut";
        description: string;
        workflowId: string;
        createdAt: string;
        updatedAt: string;
        numLeafTasks: number;
        modules?: string[] | undefined;
    }, {
        status: "Running" | "Completed" | "Failed" | "Paused" | "TimedOut";
        description: string;
        workflowId: string;
        createdAt: string;
        updatedAt: string;
        numLeafTasks: number;
        modules?: string[] | undefined;
    }>, "many">;
}, "strip", z$1.ZodTypeAny, {
    workflowInfos: {
        status: "Running" | "Completed" | "Failed" | "Paused" | "TimedOut";
        description: string;
        workflowId: string;
        createdAt: string;
        updatedAt: string;
        numLeafTasks: number;
        modules?: string[] | undefined;
    }[];
}, {
    workflowInfos: {
        status: "Running" | "Completed" | "Failed" | "Paused" | "TimedOut";
        description: string;
        workflowId: string;
        createdAt: string;
        updatedAt: string;
        numLeafTasks: number;
        modules?: string[] | undefined;
    }[];
}>;
type GetWorkflowsRes = z$1.infer<typeof getWorkflowsResSchema>;
declare const getWorkflowByIdReqSchema: z$1.ZodObject<{
    workflowId: z$1.ZodString;
}, "strip", z$1.ZodTypeAny, {
    workflowId: string;
}, {
    workflowId: string;
}>;
declare const getWorkflowByIdResSchema: z$1.ZodObject<{
    workflow: z$1.ZodType<Task, z$1.ZodTypeDef, Task>;
}, "strip", z$1.ZodTypeAny, {
    workflow: {
        id: string;
        status: "Pending";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
    } | {
        id: string;
        status: "Planning";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
        program?: string | undefined;
        feasibilityCheck?: {
            feasibility: "Feasible" | "Rewritable" | "Infeasible";
            reason: string;
            fix?: string | undefined;
        } | undefined;
        resolutionCheck?: {
            reason: string;
            resolution: "Resolved" | "Rewritable" | "Infeasible";
            fix?: string | undefined;
        } | undefined;
    } | {
        id: string;
        status: "Executing";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
        program: string;
        feasibilityCheck: {
            feasibility: "Feasible" | "Rewritable" | "Infeasible";
            reason: string;
            fix?: string | undefined;
        };
        usedFunctionNames: string[];
    } | {
        id: string;
        status: "Sequencing";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
        program: string;
        feasibilityCheck: {
            feasibility: "Feasible" | "Rewritable" | "Infeasible";
            reason: string;
            fix?: string | undefined;
        };
        usedFunctionNames?: string[] | undefined;
        resolutionCheck?: {
            reason: string;
            resolution: "Resolved" | "Rewritable" | "Infeasible";
            fix?: string | undefined;
        } | undefined;
    } | {
        id: string;
        status: "Resolved";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
        program: string;
        feasibilityCheck: {
            feasibility: "Feasible" | "Rewritable" | "Infeasible";
            reason: string;
            fix?: string | undefined;
        };
        resolutionCheck: {
            reason: string;
            resolution: "Resolved" | "Rewritable" | "Infeasible";
            fix?: string | undefined;
        };
        usedFunctionNames: string[];
    } | {
        id: string;
        status: "Errored";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
        errorMsg: string;
        errorName: string;
        errorStack?: string | undefined;
    } | ({
        id: string;
        status: "Pending" | "Planning" | "Executing" | "Sequencing" | "Resolved" | "Sequenced" | "Errored";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
    } & {
        status: "Sequenced";
        program: string;
        subtasks: Task[];
        feasibilityCheck: {
            feasibility: "Feasible" | "Rewritable" | "Infeasible";
            reason: string;
            fix?: string | undefined;
        };
        usedFunctionNames?: string[] | undefined;
        resolutionCheck?: {
            reason: string;
            resolution: "Resolved" | "Rewritable" | "Infeasible";
            fix?: string | undefined;
        } | undefined;
    });
}, {
    workflow: {
        id: string;
        status: "Pending";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
    } | {
        id: string;
        status: "Planning";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
        program?: string | undefined;
        feasibilityCheck?: {
            feasibility: "Feasible" | "Rewritable" | "Infeasible";
            reason: string;
            fix?: string | undefined;
        } | undefined;
        resolutionCheck?: {
            reason: string;
            resolution: "Resolved" | "Rewritable" | "Infeasible";
            fix?: string | undefined;
        } | undefined;
    } | {
        id: string;
        status: "Executing";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
        program: string;
        feasibilityCheck: {
            feasibility: "Feasible" | "Rewritable" | "Infeasible";
            reason: string;
            fix?: string | undefined;
        };
        usedFunctionNames: string[];
    } | {
        id: string;
        status: "Sequencing";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
        program: string;
        feasibilityCheck: {
            feasibility: "Feasible" | "Rewritable" | "Infeasible";
            reason: string;
            fix?: string | undefined;
        };
        usedFunctionNames?: string[] | undefined;
        resolutionCheck?: {
            reason: string;
            resolution: "Resolved" | "Rewritable" | "Infeasible";
            fix?: string | undefined;
        } | undefined;
    } | {
        id: string;
        status: "Resolved";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
        program: string;
        feasibilityCheck: {
            feasibility: "Feasible" | "Rewritable" | "Infeasible";
            reason: string;
            fix?: string | undefined;
        };
        resolutionCheck: {
            reason: string;
            resolution: "Resolved" | "Rewritable" | "Infeasible";
            fix?: string | undefined;
        };
        usedFunctionNames: string[];
    } | {
        id: string;
        status: "Errored";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
        errorMsg: string;
        errorName: string;
        errorStack?: string | undefined;
    } | ({
        id: string;
        status: "Pending" | "Planning" | "Executing" | "Sequencing" | "Resolved" | "Sequenced" | "Errored";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
    } & {
        status: "Sequenced";
        program: string;
        subtasks: Task[];
        feasibilityCheck: {
            feasibility: "Feasible" | "Rewritable" | "Infeasible";
            reason: string;
            fix?: string | undefined;
        };
        usedFunctionNames?: string[] | undefined;
        resolutionCheck?: {
            reason: string;
            resolution: "Resolved" | "Rewritable" | "Infeasible";
            fix?: string | undefined;
        } | undefined;
    });
}>;
type GetWorkflowByIdReq = z$1.infer<typeof getWorkflowByIdReqSchema>;
type GetWorkflowByIdRes = z$1.infer<typeof getWorkflowByIdResSchema>;
declare const postWorkflowsReqSchema: z$1.ZodObject<{
    query: z$1.ZodString;
    modules: z$1.ZodOptional<z$1.ZodArray<z$1.ZodString, "many">>;
    opts: z$1.ZodOptional<z$1.ZodObject<{
        maxFunctionMatches: z$1.ZodOptional<z$1.ZodNumber>;
    }, "strip", z$1.ZodTypeAny, {
        maxFunctionMatches?: number | undefined;
    }, {
        maxFunctionMatches?: number | undefined;
    }>>;
}, "strip", z$1.ZodTypeAny, {
    query: string;
    modules?: string[] | undefined;
    opts?: {
        maxFunctionMatches?: number | undefined;
    } | undefined;
}, {
    query: string;
    modules?: string[] | undefined;
    opts?: {
        maxFunctionMatches?: number | undefined;
    } | undefined;
}>;
declare const postWorkflowsResSchema: z$1.ZodObject<{
    message: z$1.ZodString;
    workflowId: z$1.ZodString;
}, "strip", z$1.ZodTypeAny, {
    message: string;
    workflowId: string;
}, {
    message: string;
    workflowId: string;
}>;
type PostWorkflowsReq = z$1.infer<typeof postWorkflowsReqSchema>;
type PostWorkflowsRes = z$1.infer<typeof postWorkflowsResSchema>;

/**
 * Main client
 */
declare function createWorkflowClient(baseUrl: string, apiKey: string): MappedReturnType<{
    fetchGetWorkflows: typeof fetchGetWorkflows;
    fetchGetWorkflowById: typeof fetchGetWorkflowById;
    fetchPostWorkflows: typeof fetchPostWorkflows;
}>;
type WorkflowClient = ReturnType<typeof createWorkflowClient>;
declare function fetchGetWorkflows(baseUrl: string, apiKey: string): () => Promise<GetWorkflowsRes>;
declare function fetchGetWorkflowById(baseUrl: string, apiKey: string): (req: GetWorkflowByIdReq) => Promise<GetWorkflowByIdRes>;
declare function fetchPostWorkflows(baseUrl: string, apiKey: string): (req: PostWorkflowsReq) => Promise<PostWorkflowsRes>;

declare const WorkflowStatus: {
    readonly Running: "Running";
    readonly Completed: "Completed";
    readonly Failed: "Failed";
    readonly Paused: "Paused";
    readonly TimedOut: "TimedOut";
};
type WorkflowStatus = (typeof WorkflowStatus)[keyof typeof WorkflowStatus];
declare const workflowMetadataSchema: z$1.ZodObject<{
    maxFunctionMatches: z$1.ZodOptional<z$1.ZodNumber>;
}, "strip", z$1.ZodTypeAny, {
    maxFunctionMatches?: number | undefined;
}, {
    maxFunctionMatches?: number | undefined;
}>;
type WorkflowMetadata = z$1.infer<typeof workflowMetadataSchema>;
declare const workflowSchema: z$1.ZodObject<{
    workflowId: z$1.ZodString;
    root: z$1.ZodType<Task, z$1.ZodTypeDef, Task>;
    modules: z$1.ZodOptional<z$1.ZodArray<z$1.ZodString, "many">>;
    createdAt: z$1.ZodString;
    updatedAt: z$1.ZodString;
    metadata: z$1.ZodOptional<z$1.ZodObject<{
        maxFunctionMatches: z$1.ZodOptional<z$1.ZodNumber>;
    }, "strip", z$1.ZodTypeAny, {
        maxFunctionMatches?: number | undefined;
    }, {
        maxFunctionMatches?: number | undefined;
    }>>;
    orgId: z$1.ZodString;
}, "strip", z$1.ZodTypeAny, {
    workflowId: string;
    createdAt: string;
    updatedAt: string;
    root: {
        id: string;
        status: "Pending";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
    } | {
        id: string;
        status: "Planning";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
        program?: string | undefined;
        feasibilityCheck?: {
            feasibility: "Feasible" | "Rewritable" | "Infeasible";
            reason: string;
            fix?: string | undefined;
        } | undefined;
        resolutionCheck?: {
            reason: string;
            resolution: "Resolved" | "Rewritable" | "Infeasible";
            fix?: string | undefined;
        } | undefined;
    } | {
        id: string;
        status: "Executing";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
        program: string;
        feasibilityCheck: {
            feasibility: "Feasible" | "Rewritable" | "Infeasible";
            reason: string;
            fix?: string | undefined;
        };
        usedFunctionNames: string[];
    } | {
        id: string;
        status: "Sequencing";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
        program: string;
        feasibilityCheck: {
            feasibility: "Feasible" | "Rewritable" | "Infeasible";
            reason: string;
            fix?: string | undefined;
        };
        usedFunctionNames?: string[] | undefined;
        resolutionCheck?: {
            reason: string;
            resolution: "Resolved" | "Rewritable" | "Infeasible";
            fix?: string | undefined;
        } | undefined;
    } | {
        id: string;
        status: "Resolved";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
        program: string;
        feasibilityCheck: {
            feasibility: "Feasible" | "Rewritable" | "Infeasible";
            reason: string;
            fix?: string | undefined;
        };
        resolutionCheck: {
            reason: string;
            resolution: "Resolved" | "Rewritable" | "Infeasible";
            fix?: string | undefined;
        };
        usedFunctionNames: string[];
    } | {
        id: string;
        status: "Errored";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
        errorMsg: string;
        errorName: string;
        errorStack?: string | undefined;
    } | ({
        id: string;
        status: "Pending" | "Planning" | "Executing" | "Sequencing" | "Resolved" | "Sequenced" | "Errored";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
    } & {
        status: "Sequenced";
        program: string;
        subtasks: Task[];
        feasibilityCheck: {
            feasibility: "Feasible" | "Rewritable" | "Infeasible";
            reason: string;
            fix?: string | undefined;
        };
        usedFunctionNames?: string[] | undefined;
        resolutionCheck?: {
            reason: string;
            resolution: "Resolved" | "Rewritable" | "Infeasible";
            fix?: string | undefined;
        } | undefined;
    });
    orgId: string;
    modules?: string[] | undefined;
    metadata?: {
        maxFunctionMatches?: number | undefined;
    } | undefined;
}, {
    workflowId: string;
    createdAt: string;
    updatedAt: string;
    root: {
        id: string;
        status: "Pending";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
    } | {
        id: string;
        status: "Planning";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
        program?: string | undefined;
        feasibilityCheck?: {
            feasibility: "Feasible" | "Rewritable" | "Infeasible";
            reason: string;
            fix?: string | undefined;
        } | undefined;
        resolutionCheck?: {
            reason: string;
            resolution: "Resolved" | "Rewritable" | "Infeasible";
            fix?: string | undefined;
        } | undefined;
    } | {
        id: string;
        status: "Executing";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
        program: string;
        feasibilityCheck: {
            feasibility: "Feasible" | "Rewritable" | "Infeasible";
            reason: string;
            fix?: string | undefined;
        };
        usedFunctionNames: string[];
    } | {
        id: string;
        status: "Sequencing";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
        program: string;
        feasibilityCheck: {
            feasibility: "Feasible" | "Rewritable" | "Infeasible";
            reason: string;
            fix?: string | undefined;
        };
        usedFunctionNames?: string[] | undefined;
        resolutionCheck?: {
            reason: string;
            resolution: "Resolved" | "Rewritable" | "Infeasible";
            fix?: string | undefined;
        } | undefined;
    } | {
        id: string;
        status: "Resolved";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
        program: string;
        feasibilityCheck: {
            feasibility: "Feasible" | "Rewritable" | "Infeasible";
            reason: string;
            fix?: string | undefined;
        };
        resolutionCheck: {
            reason: string;
            resolution: "Resolved" | "Rewritable" | "Infeasible";
            fix?: string | undefined;
        };
        usedFunctionNames: string[];
    } | {
        id: string;
        status: "Errored";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
        errorMsg: string;
        errorName: string;
        errorStack?: string | undefined;
    } | ({
        id: string;
        status: "Pending" | "Planning" | "Executing" | "Sequencing" | "Resolved" | "Sequenced" | "Errored";
        description: string;
        stepIndex: number;
        depth: number;
        numRewrites: number;
    } & {
        status: "Sequenced";
        program: string;
        subtasks: Task[];
        feasibilityCheck: {
            feasibility: "Feasible" | "Rewritable" | "Infeasible";
            reason: string;
            fix?: string | undefined;
        };
        usedFunctionNames?: string[] | undefined;
        resolutionCheck?: {
            reason: string;
            resolution: "Resolved" | "Rewritable" | "Infeasible";
            fix?: string | undefined;
        } | undefined;
    });
    orgId: string;
    modules?: string[] | undefined;
    metadata?: {
        maxFunctionMatches?: number | undefined;
    } | undefined;
}>;
type Workflow = z$1.infer<typeof workflowSchema>;
declare const workflowInfoSchema: z$1.ZodObject<{
    workflowId: z$1.ZodString;
    modules: z$1.ZodOptional<z$1.ZodArray<z$1.ZodString, "many">>;
    createdAt: z$1.ZodString;
    updatedAt: z$1.ZodString;
    description: z$1.ZodString;
    status: z$1.ZodNativeEnum<{
        readonly Running: "Running";
        readonly Completed: "Completed";
        readonly Failed: "Failed";
        readonly Paused: "Paused";
        readonly TimedOut: "TimedOut";
    }>;
    numLeafTasks: z$1.ZodNumber;
}, "strip", z$1.ZodTypeAny, {
    status: "Running" | "Completed" | "Failed" | "Paused" | "TimedOut";
    description: string;
    workflowId: string;
    createdAt: string;
    updatedAt: string;
    numLeafTasks: number;
    modules?: string[] | undefined;
}, {
    status: "Running" | "Completed" | "Failed" | "Paused" | "TimedOut";
    description: string;
    workflowId: string;
    createdAt: string;
    updatedAt: string;
    numLeafTasks: number;
    modules?: string[] | undefined;
}>;
type WorkflowInfo = z$1.infer<typeof workflowInfoSchema>;

declare const is: {
    instrumented: boolean;
};
declare function convertSeverityTextToNumber(severityText: string | undefined): 1 | 5 | 9 | 13 | 17 | 21 | undefined;
declare function convertSeverityValuesToLevel(severityNumber: number | undefined, severityText?: string | undefined): string;
declare function getCallerInfo(frameDepth: number): {
    filePath?: string;
    lineNum?: number;
    caller?: string;
};
declare function emitOtelLog({ level, body, severityNumber, attributes, stackDepth, }: {
    level: string;
    body: any;
    severityNumber?: number;
    attributes?: Record<string, any>;
    stackDepth?: number;
}): void;

// Type definitions for pino-std-serializers 2.4
// Definitions by: Connor Fitzgerald <https://github.com/connorjayfitzgerald>
//                 Igor Savin <https://github.com/kibertoad>
// TypeScript Version: 2.7



interface SerializedError {
  /**
   * The name of the object's constructor.
   */
  type: string;
  /**
   * The supplied error message.
   */
  message: string;
  /**
   * The stack when the error was generated.
   */
  stack: string;
  /**
   * Non-enumerable. The original Error object. This will not be included in the logged output.
   * This is available for subsequent serializers to use.
   */
  raw: Error;
  /**
   * `cause` is never included in the log output, if you need the `cause`, use {@link raw.cause}
   */
  cause?: never;
  /**
   * Any other extra properties that have been attached to the object will also be present on the serialized object.
   */
  [key: string]: any;
  [key: number]: any;
}

/**
 * Serializes an Error object. Does not serialize "err.cause" fields (will append the err.cause.message to err.message
 * and err.cause.stack to err.stack)
 */
declare function err(err: Error): SerializedError;

/**
 * Serializes an Error object, including full serialization for any err.cause fields recursively.
 */
declare function errWithCause(err: Error): SerializedError;

interface SerializedRequest {
  /**
   * Defaults to `undefined`, unless there is an `id` property already attached to the `request` object or
   * to the `request.info` object. Attach a synchronous function to the `request.id` that returns an
   * identifier to have the value filled.
   */
  id: string | undefined;
  /**
   * HTTP method.
   */
  method: string;
  /**
   * Request pathname (as per req.url in core HTTP).
   */
  url: string;
  /**
   * Reference to the `headers` object from the request (as per req.headers in core HTTP).
   */
  headers: Record<string, string>;
  remoteAddress: string;
  remotePort: number;
  params: Record<string, string>;
  query: Record<string, string>;

  /**
   * Non-enumerable, i.e. will not be in the output, original request object. This is available for subsequent
   * serializers to use. In cases where the `request` input already has  a `raw` property this will
   * replace the original `request.raw` property.
   */
  raw: IncomingMessage;
}

/**
 * Serializes a Request object.
 */
declare function req(req: IncomingMessage): SerializedRequest;

/**
 * Used internally by Pino for general request logging.
 */
declare function mapHttpRequest(req: IncomingMessage): {
  req: SerializedRequest
};

interface SerializedResponse {
  /**
   * HTTP status code.
   */
  statusCode: number;
  /**
   * The headers to be sent in the response.
   */
  headers: Record<string, string>;
  /**
   * Non-enumerable, i.e. will not be in the output, original response object. This is available for subsequent serializers to use.
   */
  raw: ServerResponse;
}

/**
 * Serializes a Response object.
 */
declare function res(res: ServerResponse): SerializedResponse;

/**
 * Used internally by Pino for general response logging.
 */
declare function mapHttpResponse(res: ServerResponse): {
  res: SerializedResponse
};

type CustomErrorSerializer = (err: SerializedError) => Record<string, any>;

/**
 * A utility method for wrapping the default error serializer.
 * This allows custom serializers to work with the already serialized object.
 * The customSerializer accepts one parameter — the newly serialized error object — and returns the new (or updated) error object.
 */
declare function wrapErrorSerializer(customSerializer: CustomErrorSerializer): (err: Error) => Record<string, any>;

type CustomRequestSerializer = (req: SerializedRequest) => Record<string, any>;

/**
 * A utility method for wrapping the default request serializer.
 * This allows custom serializers to work with the already serialized object.
 * The customSerializer accepts one parameter — the newly serialized request object — and returns the new (or updated) request object.
 */
declare function wrapRequestSerializer(customSerializer: CustomRequestSerializer): (req: IncomingMessage) => Record<string, any>;

type CustomResponseSerializer = (res: SerializedResponse) => Record<string, any>;

/**
 * A utility method for wrapping the default response serializer.
 * This allows custom serializers to work with the already serialized object.
 * The customSerializer accepts one parameter — the newly serialized response object — and returns the new (or updated) response object.
 */
declare function wrapResponseSerializer(customSerializer: CustomResponseSerializer): (res: ServerResponse) => Record<string, any>;

type pinoStdSerializers_CustomErrorSerializer = CustomErrorSerializer;
type pinoStdSerializers_CustomRequestSerializer = CustomRequestSerializer;
type pinoStdSerializers_CustomResponseSerializer = CustomResponseSerializer;
type pinoStdSerializers_SerializedError = SerializedError;
type pinoStdSerializers_SerializedRequest = SerializedRequest;
type pinoStdSerializers_SerializedResponse = SerializedResponse;
declare const pinoStdSerializers_err: typeof err;
declare const pinoStdSerializers_errWithCause: typeof errWithCause;
declare const pinoStdSerializers_mapHttpRequest: typeof mapHttpRequest;
declare const pinoStdSerializers_mapHttpResponse: typeof mapHttpResponse;
declare const pinoStdSerializers_req: typeof req;
declare const pinoStdSerializers_res: typeof res;
declare const pinoStdSerializers_wrapErrorSerializer: typeof wrapErrorSerializer;
declare const pinoStdSerializers_wrapRequestSerializer: typeof wrapRequestSerializer;
declare const pinoStdSerializers_wrapResponseSerializer: typeof wrapResponseSerializer;
declare namespace pinoStdSerializers {
  export { type pinoStdSerializers_CustomErrorSerializer as CustomErrorSerializer, type pinoStdSerializers_CustomRequestSerializer as CustomRequestSerializer, type pinoStdSerializers_CustomResponseSerializer as CustomResponseSerializer, type pinoStdSerializers_SerializedError as SerializedError, type pinoStdSerializers_SerializedRequest as SerializedRequest, type pinoStdSerializers_SerializedResponse as SerializedResponse, pinoStdSerializers_err as err, pinoStdSerializers_errWithCause as errWithCause, pinoStdSerializers_mapHttpRequest as mapHttpRequest, pinoStdSerializers_mapHttpResponse as mapHttpResponse, pinoStdSerializers_req as req, pinoStdSerializers_res as res, pinoStdSerializers_wrapErrorSerializer as wrapErrorSerializer, pinoStdSerializers_wrapRequestSerializer as wrapRequestSerializer, pinoStdSerializers_wrapResponseSerializer as wrapResponseSerializer };
}

// Type definitions for sonic-boom 0.7
// Definitions by: Alex Ferrando <https://github.com/alferpal>
//                 Igor Savin <https://github.com/kibertoad>


type SonicBoomOpts = {
    fd?: number | string | symbol
    dest?: string | number
    maxLength?: number
    minLength?: number
    maxWrite?: number
    sync?: boolean
    fsync?: boolean
    append?: boolean
    mode?: string | number
    mkdir?: boolean
    contentMode?: 'buffer' | 'utf8'
    retryEAGAIN?: (err: Error, writeBufferLen: number, remainingBufferLen: number) => boolean
}

declare class SonicBoom extends EventEmitter {
    /**
     * @param [fileDescriptor] File path or numerical file descriptor
     * relative protocol is enabled. Default: process.stdout
     * @returns a new sonic-boom instance
     */
    constructor(opts: SonicBoomOpts)

    /**
     * Writes the string to the file. It will return false to signal the producer to slow down.
     */
    write(string: string): boolean;

    /**
     * Writes the current buffer to the file if a write was not in progress.
     * Do nothing if minLength is zero or if it is already writing.
     */
    flush(cb?: (err?: Error) => unknown): void;

    /**
     * Reopen the file in place, useful for log rotation.
     */
    reopen(fileDescriptor?: string | number): void;

    /**
     * Flushes the buffered data synchronously. This is a costly operation.
     */
    flushSync(): void;

    /**
     * Closes the stream, the data will be flushed down asynchronously
     */
    end(): void;

    /**
     * Closes the stream immediately, the data is not flushed.
     */
    destroy(): void;
}

// Project: https://github.com/pinojs/pino.git, http://getpino.io
// Definitions by: Peter Snider <https://github.com/psnider>
//                 BendingBender <https://github.com/BendingBender>
//                 Christian Rackerseder <https://github.com/screendriver>
//                 GP <https://github.com/paambaati>
//                 Alex Ferrando <https://github.com/alferpal>
//                 Oleksandr Sidko <https://github.com/mortiy>
//                 Harris Lummis <https://github.com/lummish>
//                 Raoul Jaeckel <https://github.com/raoulus>
//                 Cory Donkin <https://github.com/Cooryd>
//                 Adam Vigneaux <https://github.com/AdamVig>
//                 Austin Beer <https://github.com/austin-beer>
//                 Michel Nemnom <https://github.com/Pegase745>
//                 Igor Savin <https://github.com/kibertoad>
//                 James Bromwell <https://github.com/thw0rted>
// TypeScript Version: 4.4





//// Non-exported types and interfaces

// ToDo https://github.com/pinojs/thread-stream/issues/24
type ThreadStream = any

type TimeFn = () => string;
type MixinFn = (mergeObject: object, level: number) => object;
type MixinMergeStrategyFn = (mergeObject: object, mixinObject: object) => object;

type CustomLevelLogger<CustomLevels extends string> = { [level in CustomLevels]: LogFn }

/**
* A synchronous callback that will run on each creation of a new child.
* @param child: The newly created child logger instance.
*/
type OnChildCallback<CustomLevels extends string = never> = (child: pino$1.Logger<CustomLevels>) => void

interface redactOptions {
    paths: string[];
    censor?: string | ((value: any, path: string[]) => any);
    remove?: boolean;
}

interface LoggerExtras<CustomLevels extends string = never> extends EventEmitter {
    /**
     * Exposes the Pino package version. Also available on the exported pino function.
     */
    readonly version: string;

    levels: pino$1.LevelMapping;

    /**
     * Outputs the level as a string instead of integer.
     */
    useLevelLabels: boolean;
    /**
     * Define additional logging levels.
     */
    customLevels: { [level in CustomLevels]: number };
    /**
     * Use only defined `customLevels` and omit Pino's levels.
     */
    useOnlyCustomLevels: boolean;
    /**
     * Returns the integer value for the logger instance's logging level.
     */
    levelVal: number;

    /**
     * Creates a child logger, setting all key-value pairs in `bindings` as properties in the log lines. All serializers will be applied to the given pair.
     * Child loggers use the same output stream as the parent and inherit the current log level of the parent at the time they are spawned.
     * From v2.x.x the log level of a child is mutable (whereas in v1.x.x it was immutable), and can be set independently of the parent.
     * If a `level` property is present in the object passed to `child` it will override the child logger level.
     *
     * @param bindings: an object of key-value pairs to include in log lines as properties.
     * @param options: an options object that will override child logger inherited options.
     * @returns a child logger instance.
     */
    child<ChildCustomLevels extends string = never>(bindings: pino$1.Bindings, options?: ChildLoggerOptions<ChildCustomLevels>): pino$1.Logger<CustomLevels | ChildCustomLevels>;

    /**
     * This can be used to modify the callback function on creation of a new child.
     */
    onChild: OnChildCallback<CustomLevels>;

    /**
     * Registers a listener function that is triggered when the level is changed.
     * Note: When browserified, this functionality will only be available if the `events` module has been required elsewhere
     * (e.g. if you're using streams in the browser). This allows for a trade-off between bundle size and functionality.
     *
     * @param event: only ever fires the `'level-change'` event
     * @param listener: The listener is passed four arguments: `levelLabel`, `levelValue`, `previousLevelLabel`, `previousLevelValue`.
     */
    on(event: "level-change", listener: pino$1.LevelChangeEventListener<CustomLevels>): this;
    addListener(event: "level-change", listener: pino$1.LevelChangeEventListener<CustomLevels>): this;
    once(event: "level-change", listener: pino$1.LevelChangeEventListener<CustomLevels>): this;
    prependListener(event: "level-change", listener: pino$1.LevelChangeEventListener<CustomLevels>): this;
    prependOnceListener(event: "level-change", listener: pino$1.LevelChangeEventListener<CustomLevels>): this;
    removeListener(event: "level-change", listener: pino$1.LevelChangeEventListener<CustomLevels>): this;

    /**
     * A utility method for determining if a given log level will write to the destination.
     */
    isLevelEnabled(level: pino$1.LevelWithSilentOrString): boolean;

    /**
     * Returns an object containing all the current bindings, cloned from the ones passed in via logger.child().
     */
    bindings(): pino$1.Bindings;

    /**
     * Adds to the bindings of this logger instance.
     * Note: Does not overwrite bindings. Can potentially result in duplicate keys in log lines.
     *
     * @param bindings: an object of key-value pairs to include in log lines as properties.
     */
    setBindings(bindings: pino$1.Bindings): void;

    /**
     * Flushes the content of the buffer when using pino.destination({ sync: false }).
     * call the callback when finished
     */
    flush(cb?: (err?: Error) => void): void;
}


declare namespace pino$1 {
    //// Exported types and interfaces

    interface BaseLogger {
        /**
         * Set this property to the desired logging level. In order of priority, available levels are:
         *
         * - 'fatal'
         * - 'error'
         * - 'warn'
         * - 'info'
         * - 'debug'
         * - 'trace'
         *
         * The logging level is a __minimum__ level. For instance if `logger.level` is `'info'` then all `'fatal'`, `'error'`, `'warn'`,
         * and `'info'` logs will be enabled.
         *
         * You can pass `'silent'` to disable logging.
         */
        level: pino$1.LevelWithSilentOrString;

        /**
         * Log at `'fatal'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
         * If more args follows `msg`, these will be used to format `msg` using `util.format`.
         *
         * @typeParam T: the interface of the object being serialized. Default is object.
         * @param obj: object to be serialized
         * @param msg: the log message to write
         * @param ...args: format string values when `msg` is a format string
         */
        fatal: pino$1.LogFn;
        /**
         * Log at `'error'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
         * If more args follows `msg`, these will be used to format `msg` using `util.format`.
         *
         * @typeParam T: the interface of the object being serialized. Default is object.
         * @param obj: object to be serialized
         * @param msg: the log message to write
         * @param ...args: format string values when `msg` is a format string
         */
        error: pino$1.LogFn;
        /**
         * Log at `'warn'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
         * If more args follows `msg`, these will be used to format `msg` using `util.format`.
         *
         * @typeParam T: the interface of the object being serialized. Default is object.
         * @param obj: object to be serialized
         * @param msg: the log message to write
         * @param ...args: format string values when `msg` is a format string
         */
        warn: pino$1.LogFn;
        /**
         * Log at `'info'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
         * If more args follows `msg`, these will be used to format `msg` using `util.format`.
         *
         * @typeParam T: the interface of the object being serialized. Default is object.
         * @param obj: object to be serialized
         * @param msg: the log message to write
         * @param ...args: format string values when `msg` is a format string
         */
        info: pino$1.LogFn;
        /**
         * Log at `'debug'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
         * If more args follows `msg`, these will be used to format `msg` using `util.format`.
         *
         * @typeParam T: the interface of the object being serialized. Default is object.
         * @param obj: object to be serialized
         * @param msg: the log message to write
         * @param ...args: format string values when `msg` is a format string
         */
        debug: pino$1.LogFn;
        /**
         * Log at `'trace'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
         * If more args follows `msg`, these will be used to format `msg` using `util.format`.
         *
         * @typeParam T: the interface of the object being serialized. Default is object.
         * @param obj: object to be serialized
         * @param msg: the log message to write
         * @param ...args: format string values when `msg` is a format string
         */
        trace: pino$1.LogFn;
        /**
         * Noop function.
         */
        silent: pino$1.LogFn;
    }

    type Bindings = Record<string, any>;

    type Level = "fatal" | "error" | "warn" | "info" | "debug" | "trace";
    type LevelOrString = Level | (string & {});
    type LevelWithSilent = pino$1.Level | "silent";
    type LevelWithSilentOrString = LevelWithSilent | (string & {});

    type SerializerFn = (value: any) => any;
    type WriteFn = (o: object) => void;

    type LevelChangeEventListener<CustomLevels extends string = never> = (
        lvl: LevelWithSilentOrString,
        val: number,
        prevLvl: LevelWithSilentOrString,
        prevVal: number,
        logger: Logger<CustomLevels>
    ) => void;

    type LogDescriptor = Record<string, any>;

    type Logger<CustomLevels extends string = never> = BaseLogger & LoggerExtras<CustomLevels> & CustomLevelLogger<CustomLevels>;

    type SerializedError = SerializedError;
    type SerializedResponse = SerializedResponse;
    type SerializedRequest = SerializedRequest;


    interface TransportTargetOptions<TransportOptions = Record<string, any>> {
        target: string
        options?: TransportOptions
        level?: LevelWithSilentOrString
    }

    interface TransportBaseOptions<TransportOptions = Record<string, any>> {
        options?: TransportOptions
        worker?: WorkerOptions & { autoEnd?: boolean}
    }

    interface TransportSingleOptions<TransportOptions = Record<string, any>> extends TransportBaseOptions<TransportOptions>{
        target: string
    }

    interface TransportPipelineOptions<TransportOptions = Record<string, any>> extends TransportBaseOptions<TransportOptions>{
        pipeline: TransportSingleOptions<TransportOptions>[]
        level?: LevelWithSilentOrString
    }

    interface TransportMultiOptions<TransportOptions = Record<string, any>> extends TransportBaseOptions<TransportOptions>{
        targets: readonly (TransportTargetOptions<TransportOptions>|TransportPipelineOptions<TransportOptions>)[],
        levels?: Record<string, number>
        dedupe?: boolean
    }

    interface MultiStreamOptions {
        levels?: Record<string, number>
        dedupe?: boolean
    }

    interface DestinationStream {
        write(msg: string): void;
    }

    interface DestinationStreamHasMetadata {
      [symbols.needsMetadataGsym]: true;
      lastLevel: number;
      lastTime: string;
      lastMsg: string;
      lastObj: object;
      lastLogger: pino$1.Logger;
    }

    type DestinationStreamWithMetadata = DestinationStream & ({ [symbols.needsMetadataGsym]?: false } | DestinationStreamHasMetadata);

    interface StreamEntry<TLevel = Level> {
        stream: DestinationStream
        level?: TLevel
    }

    interface MultiStreamRes<TOriginLevel = Level> {
        write: (data: any) => void,
        add: <TLevel = Level>(dest: StreamEntry<TLevel> | DestinationStream) => MultiStreamRes<TOriginLevel & TLevel>,
        flushSync: () => void,
        minLevel: number,
        streams: StreamEntry<TOriginLevel>[],
        clone<TLevel = Level>(level: TLevel): MultiStreamRes<TLevel>,
    }

    interface LevelMapping {
        /**
         * Returns the mappings of level names to their respective internal number representation.
         */
        values: { [level: string]: number };
        /**
         * Returns the mappings of level internal level numbers to their string representations.
         */
        labels: { [level: number]: string };
    }

    interface LogFn {
        // TODO: why is this different from `obj: object` or `obj: any`?
        /* tslint:disable:no-unnecessary-generics */
        <T extends object>(obj: T, msg?: string, ...args: any[]): void;
        (obj: unknown, msg?: string, ...args: any[]): void;
        (msg: string, ...args: any[]): void;
    }

    interface LoggerOptions<CustomLevels extends string = never> {
        transport?: TransportSingleOptions | TransportMultiOptions | TransportPipelineOptions
        /**
         * Avoid error causes by circular references in the object tree. Default: `true`.
         */
        safe?: boolean;
        /**
         * The name of the logger. Default: `undefined`.
         */
        name?: string;
        /**
         * an object containing functions for custom serialization of objects.
         * These functions should return an JSONifiable object and they should never throw. When logging an object,
         * each top-level property matching the exact key of a serializer will be serialized using the defined serializer.
         */
        serializers?: { [key: string]: SerializerFn };
        /**
         * Enables or disables the inclusion of a timestamp in the log message. If a function is supplied, it must
         * synchronously return a JSON string representation of the time. If set to `false`, no timestamp will be included in the output.
         * See stdTimeFunctions for a set of available functions for passing in as a value for this option.
         * Caution: any sort of formatted time will significantly slow down Pino's performance.
         */
        timestamp?: TimeFn | boolean;
        /**
         * One of the supported levels or `silent` to disable logging. Any other value defines a custom level and
         * requires supplying a level value via `levelVal`. Default: 'info'.
         */
        level?: LevelWithSilentOrString;

        /**
         * Use this option to define additional logging levels.
         * The keys of the object correspond the namespace of the log level, and the values should be the numerical value of the level.
         */
        customLevels?: { [level in CustomLevels]: number };
        /**
         *  Use this option to define custom comparison of log levels.
         *  Useful to compare custom log levels or non-standard level values.
         *  Default: "ASC"
         */
        levelComparison?: "ASC" | "DESC" | ((current: number, expected: number) => boolean);
        /**
         * Use this option to only use defined `customLevels` and omit Pino's levels.
         * Logger's default `level` must be changed to a value in `customLevels` in order to use `useOnlyCustomLevels`
         * Warning: this option may not be supported by downstream transports.
         */
        useOnlyCustomLevels?: boolean;

        /**
         * If provided, the `mixin` function is called each time one of the active logging methods
         * is called. The function must synchronously return an object. The properties of the
         * returned object will be added to the logged JSON.
         */
        mixin?: MixinFn;

        /**
         * If provided, the `mixinMergeStrategy` function is called each time one of the active
         * logging methods is called. The first parameter is the value `mergeObject` or an empty object,
         * the second parameter is the value resulting from `mixin()` or an empty object.
         * The function must synchronously return an object.
         */
        mixinMergeStrategy?: MixinMergeStrategyFn

        /**
         * As an array, the redact option specifies paths that should have their values redacted from any log output.
         *
         * Each path must be a string using a syntax which corresponds to JavaScript dot and bracket notation.
         *
         * If an object is supplied, three options can be specified:
         *
         *      paths (String[]): Required. An array of paths
         *      censor (String): Optional. A value to overwrite key which are to be redacted. Default: '[Redacted]'
         *      remove (Boolean): Optional. Instead of censoring the value, remove both the key and the value. Default: false
         */
        redact?: string[] | redactOptions;

        /**
         * When defining a custom log level via level, set to an integer value to define the new level. Default: `undefined`.
         */
        levelVal?: number;
        /**
         * The string key for the 'message' in the JSON object. Default: "msg".
         */
        messageKey?: string;
        /**
         * The string key for the 'error' in the JSON object. Default: "err".
         */
        errorKey?: string;
        /**
         * The string key to place any logged object under.
         */
        nestedKey?: string;
        /**
         * Enables logging. Default: `true`.
         */
        enabled?: boolean;
        /**
         * Browser only, see http://getpino.io/#/docs/browser.
         */
        browser?: {
            /**
             * The `asObject` option will create a pino-like log object instead of passing all arguments to a console
             * method. When `write` is set, `asObject` will always be true.
             *
             * @example
             * pino.info('hi') // creates and logs {msg: 'hi', level: 30, time: <ts>}
             */
            asObject?: boolean;
            formatters?: {
                /**
                 * Changes the shape of the log level.
                 * The default shape is { level: number }.
                 */
                level?: (label: string, number: number) => object;
                /**
                 * Changes the shape of the log object.
                 */
                log?: (object: Record<string, unknown>) => Record<string, unknown>;
            }
            /**
             * Instead of passing log messages to `console.log` they can be passed to a supplied function. If `write` is
             * set to a single function, all logging objects are passed to this function. If `write` is an object, it
             * can have methods that correspond to the levels. When a message is logged at a given level, the
             * corresponding method is called. If a method isn't present, the logging falls back to using the `console`.
             *
             * @example
             * const pino = require('pino')({
             *   browser: {
             *     write: (o) => {
             *       // do something with o
             *     }
             *   }
             * })
             *
             * @example
             * const pino = require('pino')({
             *   browser: {
             *     write: {
             *       info: function (o) {
             *         //process info log object
             *       },
             *       error: function (o) {
             *         //process error log object
             *       }
             *     }
             *   }
             * })
             */
            write?:
                | WriteFn
                | ({
                fatal?: WriteFn;
                error?: WriteFn;
                warn?: WriteFn;
                info?: WriteFn;
                debug?: WriteFn;
                trace?: WriteFn;
            } & { [logLevel: string]: WriteFn });

            /**
             * The serializers provided to `pino` are ignored by default in the browser, including the standard
             * serializers provided with Pino. Since the default destination for log messages is the console, values
             * such as `Error` objects are enhanced for inspection, which they otherwise wouldn't be if the Error
             * serializer was enabled. We can turn all serializers on or we can selectively enable them via an array.
             *
             * When `serialize` is `true` the standard error serializer is also enabled (see
             * {@link https://github.com/pinojs/pino/blob/master/docs/api.md#pino-stdserializers}). This is a global
             * serializer which will apply to any `Error` objects passed to the logger methods.
             *
             * If `serialize` is an array the standard error serializer is also automatically enabled, it can be
             * explicitly disabled by including a string in the serialize array: `!stdSerializers.err` (see example).
             *
             * The `serialize` array also applies to any child logger serializers (see
             * {@link https://github.com/pinojs/pino/blob/master/docs/api.md#bindingsserializers-object} for how to
             * set child-bound serializers).
             *
             * Unlike server pino the serializers apply to every object passed to the logger method, if the `asObject`
             * option is `true`, this results in the serializers applying to the first object (as in server pino).
             *
             * For more info on serializers see
             * {@link https://github.com/pinojs/pino/blob/master/docs/api.md#serializers-object}.
             *
             * @example
             * const pino = require('pino')({
             *   browser: {
             *     serialize: true
             *   }
             * })
             *
             * @example
             * const pino = require('pino')({
             *   serializers: {
             *     custom: myCustomSerializer,
             *     another: anotherSerializer
             *   },
             *   browser: {
             *     serialize: ['custom']
             *   }
             * })
             * // following will apply myCustomSerializer to the custom property,
             * // but will not apply anotherSerializer to another key
             * pino.info({custom: 'a', another: 'b'})
             *
             * @example
             * const pino = require('pino')({
             *   serializers: {
             *     custom: myCustomSerializer,
             *     another: anotherSerializer
             *   },
             *   browser: {
             *     serialize: ['!stdSerializers.err', 'custom'] //will not serialize Errors, will serialize `custom` keys
             *   }
             * })
             */
            serialize?: boolean | string[];

            /**
             * Options for transmission of logs.
             *
             * @example
             * const pino = require('pino')({
             *   browser: {
             *     transmit: {
             *       level: 'warn',
             *       send: function (level, logEvent) {
             *         if (level === 'warn') {
             *           // maybe send the logEvent to a separate endpoint
             *           // or maybe analyse the messages further before sending
             *         }
             *         // we could also use the `logEvent.level.value` property to determine
             *         // numerical value
             *         if (logEvent.level.value >= 50) { // covers error and fatal
             *
             *           // send the logEvent somewhere
             *         }
             *       }
             *     }
             *   }
             * })
             */
            transmit?: {
                /**
                 * Specifies the minimum level (inclusive) of when the `send` function should be called, if not supplied
                 * the `send` function will be called based on the main logging `level` (set via `options.level`,
                 * defaulting to `info`).
                 */
                level?: LevelOrString;
                /**
                 * Remotely record log messages.
                 *
                 * @description Called after writing the log message.
                 */
                send: (level: Level, logEvent: LogEvent) => void;
            };
            /**
             * The disabled option will disable logging in browser if set to true, by default it is set to false.
             *
             * @example
             * const pino = require('pino')({browser: {disabled: true}})
             */
            disabled?: boolean;
        };
        /**
         * key-value object added as child logger to each log line. If set to null the base child logger is not added
         */
        base?: { [key: string]: any } | null;

        /**
         * An object containing functions for formatting the shape of the log lines.
         * These functions should return a JSONifiable object and should never throw.
         * These functions allow for full customization of the resulting log lines.
         * For example, they can be used to change the level key name or to enrich the default metadata.
         */
        formatters?: {
            /**
             * Changes the shape of the log level.
             * The default shape is { level: number }.
             * The function takes two arguments, the label of the level (e.g. 'info') and the numeric value (e.g. 30).
             */
            level?: (label: string, number: number) => object;
            /**
             * Changes the shape of the bindings.
             * The default shape is { pid, hostname }.
             * The function takes a single argument, the bindings object.
             * It will be called every time a child logger is created.
             */
            bindings?: (bindings: Bindings) => object;
            /**
             * Changes the shape of the log object.
             * This function will be called every time one of the log methods (such as .info) is called.
             * All arguments passed to the log method, except the message, will be pass to this function.
             * By default it does not change the shape of the log object.
             */
            log?: (object: Record<string, unknown>) => Record<string, unknown>;
        };

        /**
         * A string that would be prefixed to every message (and child message)
         */
        msgPrefix?: string

        /**
         * An object mapping to hook functions. Hook functions allow for customizing internal logger operations.
         * Hook functions must be synchronous functions.
         */
        hooks?: {
            /**
             * Allows for manipulating the parameters passed to logger methods. The signature for this hook is
             * logMethod (args, method, level) {}, where args is an array of the arguments that were passed to the
             * log method and method is the log method itself, and level is the log level. This hook must invoke the method function by
             * using apply, like so: method.apply(this, newArgumentsArray).
             */
            logMethod?: (this: Logger, args: Parameters<LogFn>, method: LogFn, level: number) => void;
        };

        /**
         * Stringification limit at a specific nesting depth when logging circular object. Default: `5`.
         */
         depthLimit?: number

         /**
          * Stringification limit of properties/elements when logging a specific object/array with circular references. Default: `100`.
          */
          edgeLimit?: number

        /**
         * Optional child creation callback.
         */
        onChild?: OnChildCallback<CustomLevels>;

        /**
         * logs newline delimited JSON with `\r\n` instead of `\n`. Default: `false`.
         */
        crlf?: boolean;
    }

    interface ChildLoggerOptions<CustomLevels extends string = never> {
        level?: LevelOrString;
        serializers?: { [key: string]: SerializerFn };
        customLevels?: { [level in CustomLevels]: number };
        formatters?: {
            level?: (label: string, number: number) => object;
            bindings?: (bindings: Bindings) => object;
            log?: (object: object) => object;
        };
        redact?: string[] | redactOptions;
        msgPrefix?: string
    }

    /**
     * A data structure representing a log message, it represents the arguments passed to a logger statement, the level
     * at which they were logged and the hierarchy of child bindings.
     *
     * @description By default serializers are not applied to log output in the browser, but they will always be applied
     * to `messages` and `bindings` in the `logEvent` object. This allows  us to ensure a consistent format for all
     * values between server and client.
     */
    interface LogEvent {
        /**
         * Unix epoch timestamp in milliseconds, the time is taken from the moment the logger method is called.
         */
        ts: number;
        /**
         * All arguments passed to logger method, (for instance `logger.info('a', 'b', 'c')` would result in `messages`
         * array `['a', 'b', 'c']`).
         */
        messages: any[];
        /**
         * Represents each child logger (if any), and the relevant bindings.
         *
         * @description For instance, given `logger.child({a: 1}).child({b: 2}).info({c: 3})`, the bindings array would
         * hold `[{a: 1}, {b: 2}]` and the `messages` array would be `[{c: 3}]`. The `bindings` are ordered according to
         * their position in the child logger hierarchy, with the lowest index being the top of the hierarchy.
         */
        bindings: Bindings[];
        /**
         * Holds the `label` (for instance `info`), and the corresponding numerical `value` (for instance `30`).
         * This could be important in cases where client side level values and labels differ from server side.
         */
        level: {
            label: string;
            value: number;
        };
    }



    //// Top level variable (const) exports

    /**
     * Provides functions for serializing objects common to many projects.
     */
    export const stdSerializers: typeof pinoStdSerializers;

    /**
     * Holds the current log format version (as output in the v property of each log record).
     */
    export const levels: LevelMapping;
    export const symbols: {
        readonly setLevelSym: unique symbol;
        readonly getLevelSym: unique symbol;
        readonly levelValSym: unique symbol;
        readonly useLevelLabelsSym: unique symbol;
        readonly mixinSym: unique symbol;
        readonly lsCacheSym: unique symbol;
        readonly chindingsSym: unique symbol;
        readonly parsedChindingsSym: unique symbol;
        readonly asJsonSym: unique symbol;
        readonly writeSym: unique symbol;
        readonly serializersSym: unique symbol;
        readonly redactFmtSym: unique symbol;
        readonly timeSym: unique symbol;
        readonly timeSliceIndexSym: unique symbol;
        readonly streamSym: unique symbol;
        readonly stringifySym: unique symbol;
        readonly stringifySafeSym: unique symbol;
        readonly stringifiersSym: unique symbol;
        readonly endSym: unique symbol;
        readonly formatOptsSym: unique symbol;
        readonly messageKeySym: unique symbol;
        readonly errorKeySym: unique symbol;
        readonly nestedKeySym: unique symbol;
        readonly wildcardFirstSym: unique symbol;
        readonly needsMetadataGsym: unique symbol;
        readonly useOnlyCustomLevelsSym: unique symbol;
        readonly formattersSym: unique symbol;
        readonly hooksSym: unique symbol;
    };

    /**
     * Exposes the Pino package version. Also available on the logger instance.
     */
    export const version: string;

    /**
     * Provides functions for generating the timestamp property in the log output. You can set the `timestamp` option during
     * initialization to one of these functions to adjust the output format. Alternatively, you can specify your own time function.
     * A time function must synchronously return a string that would be a valid component of a JSON string. For example,
     * the default function returns a string like `,"time":1493426328206`.
     */
    export const stdTimeFunctions: {
        /**
         * The default time function for Pino. Returns a string like `,"time":1493426328206`.
         */
        epochTime: TimeFn;
        /*
            * Returns the seconds since Unix epoch
            */
        unixTime: TimeFn;
        /**
         * Returns an empty string. This function is used when the `timestamp` option is set to `false`.
         */
        nullTime: TimeFn;
        /*
            * Returns ISO 8601-formatted time in UTC
            */
        isoTime: TimeFn;
    };

    //// Exported functions

    /**
     * Create a Pino Destination instance: a stream-like object with significantly more throughput (over 30%) than a standard Node.js stream.
     * @param [dest]: The `destination` parameter, can be a file descriptor, a file path, or an object with `dest` property pointing to a fd or path.
     *                An ordinary Node.js `stream` file descriptor can be passed as the destination (such as the result of `fs.createWriteStream`)
     *                but for peak log writing performance, it is strongly recommended to use `pino.destination` to create the destination stream.
     * @returns A Sonic-Boom  stream to be used as destination for the pino function
     */
    export function destination(
        dest?: number | object | string | DestinationStream | NodeJS.WritableStream | SonicBoomOpts,
    ): SonicBoom;

    export function transport<TransportOptions = Record<string, any>>(
        options: TransportSingleOptions<TransportOptions> | TransportMultiOptions<TransportOptions> | TransportPipelineOptions<TransportOptions>
    ): ThreadStream

    export function multistream<TLevel = Level>(
        streamsArray: (DestinationStream | StreamEntry<TLevel>)[] | DestinationStream | StreamEntry<TLevel>,
        opts?: MultiStreamOptions
    ): MultiStreamRes<TLevel>
}

//// Callable default export

/**
 * @param [optionsOrStream]: an options object or a writable stream where the logs will be written. It can also receive some log-line metadata, if the
 * relative protocol is enabled. Default: process.stdout
 * @returns a new logger instance.
 */
declare function pino$1<CustomLevels extends string = never>(optionsOrStream?: LoggerOptions<CustomLevels> | DestinationStream): Logger<CustomLevels>;

/**
 * @param [options]: an options object
 * @param [stream]: a writable stream where the logs will be written. It can also receive some log-line metadata, if the
 * relative protocol is enabled. Default: process.stdout
 * @returns a new logger instance.
 */
declare function pino$1<CustomLevels extends string = never>(options: LoggerOptions<CustomLevels>, stream?: DestinationStream | undefined): Logger<CustomLevels>;
type Logger<CustomLevels extends string = never> = pino$1.Logger<CustomLevels>;
interface ChildLoggerOptions<CustomLevels extends string = never> extends pino$1.ChildLoggerOptions<CustomLevels> {}
interface DestinationStream extends pino$1.DestinationStream {}
interface LogFn extends pino$1.LogFn {}
interface LoggerOptions<CustomLevels extends string = never> extends pino$1.LoggerOptions<CustomLevels> {}

/**
 * Pino write stream to send logs to OpenTelemetry
 */
declare function write(str: string): void;
declare const config$1: {
    mixinStackDepth: number;
};
/**
 * Pino mixin stack looks like this:
 * Error
 *  at mixin
 *  options.mixin
 *  at Pino.write
 *  at Pino.LOG
 *  at ..../test/express_instrumentation.test.ts:43:10
 */
declare function mixin$1(): Record<string, string | number | undefined>;
declare const destination: DestinationStream;
declare const options: LoggerOptions<never>;
declare const args: readonly [LoggerOptions<never>, DestinationStream];
declare const iudexPino: {
    write: typeof write;
    config: {
        mixinStackDepth: number;
    };
    mixin: typeof mixin$1;
    destination: DestinationStream;
    options: LoggerOptions<never>;
    args: readonly [LoggerOptions<never>, DestinationStream];
};

declare const pino_args: typeof args;
declare const pino_destination: typeof destination;
declare const pino_iudexPino: typeof iudexPino;
declare const pino_options: typeof options;
declare const pino_write: typeof write;
declare namespace pino {
  export { pino_args as args, config$1 as config, pino_destination as destination, pino_iudexPino as iudexPino, mixin$1 as mixin, pino_options as options, pino_write as write };
}

declare const stream: DestinationStream;
declare const config: {
    mixinStackDepth: number;
};
/**
 *
 * Error
    at getCallerInfo (/.../instrumentation/utils.ts:65:14)
    at mixin (/.../instrumentation/fastify.ts:2:54)
    at write (/.../pino/lib/proto.js:79:42)
    at LOG (/.../pino/lib/tools.js:33:23)
    at logServerAddress (/.../fastify/lib/server.js:256:18)
    at wrap (/.../fastify/lib/server.js:137:46)
    at <anonymous> (node:http:29:36)
 */
declare function mixin(): Record<string, string | number | undefined>;
declare const logger: {
    level: string;
    mixin: typeof mixin;
    stream: DestinationStream;
};
declare const iudexFastify: {
    stream: DestinationStream;
    mixin: typeof mixin;
    logger: {
        level: string;
        mixin: typeof mixin;
        stream: DestinationStream;
    };
};

declare const fastify_config: typeof config;
declare const fastify_iudexFastify: typeof iudexFastify;
declare const fastify_logger: typeof logger;
declare const fastify_mixin: typeof mixin;
declare const fastify_stream: typeof stream;
declare namespace fastify {
  export { fastify_config as config, fastify_iudexFastify as iudexFastify, fastify_logger as logger, fastify_mixin as mixin, fastify_stream as stream };
}

declare function instrumentConsole(): void;

declare const console_instrumentConsole: typeof instrumentConsole;
declare namespace console {
  export { console_instrumentConsole as instrumentConsole };
}

declare function instrument({ baseUrl, iudexApiKey, serviceName, instanceId, gitCommit, githubUrl, env, headers: configHeaders, settings, }?: {
    baseUrl?: string;
    iudexApiKey?: string;
    serviceName?: string;
    instanceId?: string;
    gitCommit?: string;
    githubUrl?: string;
    env?: string;
    headers?: Record<string, string>;
    settings?: Partial<{
        instrumentConsole: boolean;
    }>;
}): {
    updateResource(newResource: Record<string, any>): void;
} | undefined;
/**
 * Trace decorator
 */
declare function withTracing<T extends (...args: any) => any>(fn: T, ctx?: {
    name: string | symbol;
}): T;

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
declare function createClient(baseUrl: string, apiKey: string): {
    fetchGetWorkflows: () => Promise<{
        workflowInfos: {
            status: "Running" | "Completed" | "Failed" | "Paused" | "TimedOut";
            description: string;
            workflowId: string;
            createdAt: string;
            updatedAt: string;
            numLeafTasks: number;
            modules?: string[] | undefined;
        }[];
    }>;
    fetchGetWorkflowById: (req: {
        workflowId: string;
    }) => Promise<{
        workflow: {
            id: string;
            status: "Pending";
            description: string;
            stepIndex: number;
            depth: number;
            numRewrites: number;
        } | {
            id: string;
            status: "Planning";
            description: string;
            stepIndex: number;
            depth: number;
            numRewrites: number;
            program?: string | undefined;
            feasibilityCheck?: {
                feasibility: "Feasible" | "Rewritable" | "Infeasible";
                reason: string;
                fix?: string | undefined;
            } | undefined;
            resolutionCheck?: {
                reason: string;
                resolution: "Resolved" | "Rewritable" | "Infeasible";
                fix?: string | undefined;
            } | undefined;
        } | {
            id: string;
            status: "Executing";
            description: string;
            stepIndex: number;
            depth: number;
            numRewrites: number;
            program: string;
            feasibilityCheck: {
                feasibility: "Feasible" | "Rewritable" | "Infeasible";
                reason: string;
                fix?: string | undefined;
            };
            usedFunctionNames: string[];
        } | {
            id: string;
            status: "Sequencing";
            description: string;
            stepIndex: number;
            depth: number;
            numRewrites: number;
            program: string;
            feasibilityCheck: {
                feasibility: "Feasible" | "Rewritable" | "Infeasible";
                reason: string;
                fix?: string | undefined;
            };
            usedFunctionNames?: string[] | undefined;
            resolutionCheck?: {
                reason: string;
                resolution: "Resolved" | "Rewritable" | "Infeasible";
                fix?: string | undefined;
            } | undefined;
        } | {
            id: string;
            status: "Resolved";
            description: string;
            stepIndex: number;
            depth: number;
            numRewrites: number;
            program: string;
            feasibilityCheck: {
                feasibility: "Feasible" | "Rewritable" | "Infeasible";
                reason: string;
                fix?: string | undefined;
            };
            resolutionCheck: {
                reason: string;
                resolution: "Resolved" | "Rewritable" | "Infeasible";
                fix?: string | undefined;
            };
            usedFunctionNames: string[];
        } | {
            id: string;
            status: "Errored";
            description: string;
            stepIndex: number;
            depth: number;
            numRewrites: number;
            errorMsg: string;
            errorName: string;
            errorStack?: string | undefined;
        } | ({
            id: string;
            status: "Pending" | "Planning" | "Executing" | "Sequencing" | "Resolved" | "Sequenced" | "Errored";
            description: string;
            stepIndex: number;
            depth: number;
            numRewrites: number;
        } & {
            status: "Sequenced";
            program: string;
            subtasks: Task[];
            feasibilityCheck: {
                feasibility: "Feasible" | "Rewritable" | "Infeasible";
                reason: string;
                fix?: string | undefined;
            };
            usedFunctionNames?: string[] | undefined;
            resolutionCheck?: {
                reason: string;
                resolution: "Resolved" | "Rewritable" | "Infeasible";
                fix?: string | undefined;
            } | undefined;
        });
    }>;
    fetchPostWorkflows: (req: {
        query: string;
        modules?: string[] | undefined;
        opts?: {
            maxFunctionMatches?: number | undefined;
        } | undefined;
    }) => Promise<{
        message: string;
        workflowId: string;
    }>;
    returnFunctionCall: (functionCallId: string, functionReturn: string) => Promise<void>;
    nextMessage: (workflowId: string) => Promise<NextMessageRes>;
    startWorkflow: (query: string, modules?: string[] | undefined) => Promise<StartWorkflowRes>;
    putFunctionJsons: (jsons: {
        name: string;
        description?: string | undefined;
        parameters?: Record<string, any> | undefined;
        returns?: Record<string, any> | undefined;
        usageExample?: string | undefined;
        returnsExample?: string | undefined;
    }[], module?: string | undefined) => Promise<void>;
};
/**
 * Iudex api client.
 */
declare class Iudex {
    baseUrl: string;
    apiKey: string;
    maxTries: number;
    client: ReturnType<typeof createClient>;
    currentWorkflowId?: Promise<string>;
    functionLinker?: (fnName: string) => (...args: any[]) => unknown;
    constructor({ apiKey, baseUrl, maxTries, }?: {
        apiKey?: string;
        baseUrl?: string;
        maxTries?: number;
    });
    uploadFunctions: (jsons: Array<OpenAI.ChatCompletionCreateParams.Function | FunctionJson$1>, modules?: string) => Promise<void>;
    linkFunctions: (functionLinker: (fnName: string) => (...args: any[]) => unknown) => void;
    /**
     * @param message message to send
     * @returns response as a chat object
     */
    sendChatTurn: (message: string, opts?: {
        onChatTurn?: ((c: ChatTurn) => void) | undefined;
        initAuth?: string | undefined;
        modules?: string[] | undefined;
    }) => Promise<ChatText>;
    /**
     * @param message message to send
     * @returns response message as a string
     */
    sendMessage: (message: string, opts?: {
        onChatTurn?: ((c: ChatTurn) => void) | undefined;
        initAuth?: string | undefined;
        modules?: string[] | undefined;
    }) => Promise<string>;
    streamCurrentTask(): AsyncGenerator<Task>;
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
declare function getLastTaskByStatus<Statuses extends TaskStatus | TaskStatus[]>(root: Task, status: Statuses): TaskStatusesToType<Statuses> | undefined;
declare function getFirstTaskByStatus<S extends TaskStatus | TaskStatus[]>(root: Task, status: S | S[]): TaskStatusesToType<S | S[]> | undefined;
declare function reversePreOrderTraversal<T>(getChildren: (node: T) => T[], predicate: (node: T) => boolean): (node: T) => T | undefined;
declare function preOrderTraversal<T>(getChildren: (node: T) => T[], predicate: (node: T) => boolean): (node: T) => T | undefined;

export { type BaseTask, type ChatCompletionMessageWithIudex, type ChatCompletionWithIudex, type ChatError, type ChatFunctionCall, type ChatFunctionReturn, type ChatImage, type ChatList, type ChatText, type ChatTurn, type ChatTurnType, type ChatTurnUnion, DEFAULT_BASE_URL, Feasibility, type FeasibilityCheck, type GetWorkflowByIdReq, type GetWorkflowByIdRes, type GetWorkflowsRes, Iudex, type IudexMessage, type NextMessageRes, type PostWorkflowsReq, type PostWorkflowsRes, Resolution, type ResolutionCheck, type ReturnFunctionCallBody, type ReturnFunctionCallRes, type StartWorkflowRes, type Task, type TaskErrored, type TaskExecuting, type TaskPending, type TaskPlanning, type TaskResolved, type TaskSequenced, type TaskSequencing, TaskStatus, type TaskStatusToType, type TaskStatusesToType, TerminalTaskStatuses, type Workflow, type WorkflowClient, type WorkflowInfo, type WorkflowMetadata, WorkflowStatus, baseTaskSchema, chatErrorSchema, chatFunctionCallSchema, chatFunctionReturnSchema, chatImageSchema, chatListSchema, chatTextSchema, chatTurnSchema, convertSeverityTextToNumber, convertSeverityValuesToLevel, createClient, createFunctionClient, createWorkflowClient, emitOtelLog, extractMessageTextContent, feasibilityCheckSchema, fetchGetWorkflowById, fetchGetWorkflows, fetchPostWorkflows, getCallerInfo, getFirstTaskByStatus, getLastTaskByStatus, getWorkflowByIdReqSchema, getWorkflowByIdResSchema, getWorkflowsResSchema, instrument, is, console as iudexConsole, fastify as iudexFastify, pino as iudexPino, mapIudexToOpenAi, nextMessage, postWorkflowsReqSchema, postWorkflowsResSchema, preOrderTraversal, putFunctionJsons, type putFunctionJsonsReq, resolutionCheckSchema, returnFunctionCall, reversePreOrderTraversal, startWorkflow, taskErroredSchema, taskExecutingSchema, taskPendingSchema, taskPlanningSchema, taskResolvedSchema, taskSchema, taskSequencedSchema, taskSequencingSchema, withTracing, workflowInfoSchema, workflowMetadataSchema, workflowSchema };
