import z$1, { z } from 'zod';
import OpenAI from 'openai';
import { FunctionJson as FunctionJson$1 } from 'function-json-schema';
export * from 'function-json-schema';

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

export { type BaseTask, type ChatCompletionMessageWithIudex, type ChatCompletionWithIudex, type ChatError, type ChatFunctionCall, type ChatFunctionReturn, type ChatImage, type ChatList, type ChatText, type ChatTurn, type ChatTurnType, type ChatTurnUnion, DEFAULT_BASE_URL, Feasibility, type FeasibilityCheck, type GetWorkflowByIdReq, type GetWorkflowByIdRes, type GetWorkflowsRes, Iudex, type IudexMessage, type NextMessageRes, type PostWorkflowsReq, type PostWorkflowsRes, Resolution, type ResolutionCheck, type ReturnFunctionCallBody, type ReturnFunctionCallRes, type StartWorkflowRes, type Task, type TaskErrored, type TaskExecuting, type TaskPending, type TaskPlanning, type TaskResolved, type TaskSequenced, type TaskSequencing, TaskStatus, type TaskStatusToType, type TaskStatusesToType, TerminalTaskStatuses, type Workflow, type WorkflowClient, type WorkflowInfo, type WorkflowMetadata, WorkflowStatus, baseTaskSchema, chatErrorSchema, chatFunctionCallSchema, chatFunctionReturnSchema, chatImageSchema, chatListSchema, chatTextSchema, chatTurnSchema, createClient, createFunctionClient, createWorkflowClient, extractMessageTextContent, feasibilityCheckSchema, fetchGetWorkflowById, fetchGetWorkflows, fetchPostWorkflows, getFirstTaskByStatus, getLastTaskByStatus, getWorkflowByIdReqSchema, getWorkflowByIdResSchema, getWorkflowsResSchema, mapIudexToOpenAi, nextMessage, postWorkflowsReqSchema, postWorkflowsResSchema, preOrderTraversal, putFunctionJsons, type putFunctionJsonsReq, resolutionCheckSchema, returnFunctionCall, reversePreOrderTraversal, startWorkflow, taskErroredSchema, taskExecutingSchema, taskPendingSchema, taskPlanningSchema, taskResolvedSchema, taskSchema, taskSequencedSchema, taskSequencingSchema, workflowInfoSchema, workflowMetadataSchema, workflowSchema };
