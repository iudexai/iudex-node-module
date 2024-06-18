import z from 'zod';
export declare const TaskStatus: {
    readonly Pending: "Pending";
    readonly Planning: "Planning";
    readonly Executing: "Executing";
    readonly Sequencing: "Sequencing";
    readonly Resolved: "Resolved";
    readonly Sequenced: "Sequenced";
    readonly Errored: "Errored";
};
export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
export declare const TerminalTaskStatuses: readonly ["Resolved", "Sequenced", "Errored"];
export declare const baseTaskSchema: z.ZodObject<{
    id: z.ZodString;
    description: z.ZodString;
    status: z.ZodNativeEnum<{
        readonly Pending: "Pending";
        readonly Planning: "Planning";
        readonly Executing: "Executing";
        readonly Sequencing: "Sequencing";
        readonly Resolved: "Resolved";
        readonly Sequenced: "Sequenced";
        readonly Errored: "Errored";
    }>;
    stepIndex: z.ZodNumber;
    depth: z.ZodNumber;
    numRewrites: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
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
export type BaseTask = z.infer<typeof baseTaskSchema>;
export declare const Feasibility: {
    readonly Feasible: "Feasible";
    readonly Rewritable: "Rewritable";
    readonly Infeasible: "Infeasible";
};
export type Feasibility = (typeof Feasibility)[keyof typeof Feasibility];
export declare const feasibilityCheckSchema: z.ZodObject<{
    feasibility: z.ZodNativeEnum<{
        readonly Feasible: "Feasible";
        readonly Rewritable: "Rewritable";
        readonly Infeasible: "Infeasible";
    }>;
    reason: z.ZodString;
    fix: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    feasibility: "Feasible" | "Rewritable" | "Infeasible";
    reason: string;
    fix?: string | undefined;
}, {
    feasibility: "Feasible" | "Rewritable" | "Infeasible";
    reason: string;
    fix?: string | undefined;
}>;
export type FeasibilityCheck = z.infer<typeof feasibilityCheckSchema>;
export declare const Resolution: {
    readonly Resolved: "Resolved";
    readonly Rewritable: "Rewritable";
    readonly Infeasible: "Infeasible";
};
export type Resolution = (typeof Resolution)[keyof typeof Resolution];
export declare const resolutionCheckSchema: z.ZodObject<{
    resolution: z.ZodNativeEnum<{
        readonly Resolved: "Resolved";
        readonly Rewritable: "Rewritable";
        readonly Infeasible: "Infeasible";
    }>;
    reason: z.ZodString;
    fix: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    reason: string;
    resolution: "Resolved" | "Rewritable" | "Infeasible";
    fix?: string | undefined;
}, {
    reason: string;
    resolution: "Resolved" | "Rewritable" | "Infeasible";
    fix?: string | undefined;
}>;
export type ResolutionCheck = z.infer<typeof resolutionCheckSchema>;
export declare const taskPendingSchema: z.ZodObject<{
    id: z.ZodString;
    description: z.ZodString;
    stepIndex: z.ZodNumber;
    depth: z.ZodNumber;
    numRewrites: z.ZodNumber;
    status: z.ZodLiteral<"Pending">;
}, "strip", z.ZodTypeAny, {
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
export type TaskPending = z.infer<typeof taskPendingSchema>;
export declare const taskPlanningSchema: z.ZodObject<{
    id: z.ZodString;
    description: z.ZodString;
    stepIndex: z.ZodNumber;
    depth: z.ZodNumber;
    numRewrites: z.ZodNumber;
    status: z.ZodLiteral<"Planning">;
    program: z.ZodOptional<z.ZodString>;
    feasibilityCheck: z.ZodOptional<z.ZodObject<{
        feasibility: z.ZodNativeEnum<{
            readonly Feasible: "Feasible";
            readonly Rewritable: "Rewritable";
            readonly Infeasible: "Infeasible";
        }>;
        reason: z.ZodString;
        fix: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    }, {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    }>>;
    resolutionCheck: z.ZodOptional<z.ZodObject<{
        resolution: z.ZodNativeEnum<{
            readonly Resolved: "Resolved";
            readonly Rewritable: "Rewritable";
            readonly Infeasible: "Infeasible";
        }>;
        reason: z.ZodString;
        fix: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        reason: string;
        resolution: "Resolved" | "Rewritable" | "Infeasible";
        fix?: string | undefined;
    }, {
        reason: string;
        resolution: "Resolved" | "Rewritable" | "Infeasible";
        fix?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
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
export type TaskPlanning = z.infer<typeof taskPlanningSchema>;
export declare const taskExecutingSchema: z.ZodObject<{
    id: z.ZodString;
    description: z.ZodString;
    stepIndex: z.ZodNumber;
    depth: z.ZodNumber;
    numRewrites: z.ZodNumber;
    status: z.ZodLiteral<"Executing">;
    program: z.ZodString;
    usedFunctionNames: z.ZodArray<z.ZodString, "many">;
    feasibilityCheck: z.ZodObject<{
        feasibility: z.ZodNativeEnum<{
            readonly Feasible: "Feasible";
            readonly Rewritable: "Rewritable";
            readonly Infeasible: "Infeasible";
        }>;
        reason: z.ZodString;
        fix: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    }, {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
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
export type TaskExecuting = z.infer<typeof taskExecutingSchema>;
export declare const taskResolvedSchema: z.ZodObject<{
    id: z.ZodString;
    description: z.ZodString;
    stepIndex: z.ZodNumber;
    depth: z.ZodNumber;
    numRewrites: z.ZodNumber;
    status: z.ZodLiteral<"Resolved">;
    program: z.ZodString;
    usedFunctionNames: z.ZodArray<z.ZodString, "many">;
    feasibilityCheck: z.ZodObject<{
        feasibility: z.ZodNativeEnum<{
            readonly Feasible: "Feasible";
            readonly Rewritable: "Rewritable";
            readonly Infeasible: "Infeasible";
        }>;
        reason: z.ZodString;
        fix: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    }, {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    }>;
    resolutionCheck: z.ZodObject<{
        resolution: z.ZodNativeEnum<{
            readonly Resolved: "Resolved";
            readonly Rewritable: "Rewritable";
            readonly Infeasible: "Infeasible";
        }>;
        reason: z.ZodString;
        fix: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        reason: string;
        resolution: "Resolved" | "Rewritable" | "Infeasible";
        fix?: string | undefined;
    }, {
        reason: string;
        resolution: "Resolved" | "Rewritable" | "Infeasible";
        fix?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
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
export type TaskResolved = z.infer<typeof taskResolvedSchema>;
export declare const taskSequencingSchema: z.ZodObject<{
    id: z.ZodString;
    description: z.ZodString;
    stepIndex: z.ZodNumber;
    depth: z.ZodNumber;
    numRewrites: z.ZodNumber;
    status: z.ZodLiteral<"Sequencing">;
    program: z.ZodString;
    feasibilityCheck: z.ZodObject<{
        feasibility: z.ZodNativeEnum<{
            readonly Feasible: "Feasible";
            readonly Rewritable: "Rewritable";
            readonly Infeasible: "Infeasible";
        }>;
        reason: z.ZodString;
        fix: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    }, {
        feasibility: "Feasible" | "Rewritable" | "Infeasible";
        reason: string;
        fix?: string | undefined;
    }>;
    usedFunctionNames: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    resolutionCheck: z.ZodOptional<z.ZodObject<{
        resolution: z.ZodNativeEnum<{
            readonly Resolved: "Resolved";
            readonly Rewritable: "Rewritable";
            readonly Infeasible: "Infeasible";
        }>;
        reason: z.ZodString;
        fix: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        reason: string;
        resolution: "Resolved" | "Rewritable" | "Infeasible";
        fix?: string | undefined;
    }, {
        reason: string;
        resolution: "Resolved" | "Rewritable" | "Infeasible";
        fix?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
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
export type TaskSequencing = z.infer<typeof taskSequencingSchema>;
export type TaskSequenced = z.infer<typeof baseTaskSchema> & {
    status: 'Sequenced';
    program: string;
    subtasks: Task[];
    feasibilityCheck: FeasibilityCheck;
    usedFunctionNames?: string[];
    resolutionCheck?: ResolutionCheck;
};
export declare const taskSequencedSchema: z.ZodType<TaskSequenced>;
export declare const taskErroredSchema: z.ZodObject<{
    id: z.ZodString;
    description: z.ZodString;
    stepIndex: z.ZodNumber;
    depth: z.ZodNumber;
    numRewrites: z.ZodNumber;
    status: z.ZodLiteral<"Errored">;
    errorMsg: z.ZodString;
    errorName: z.ZodString;
    errorStack: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
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
export type TaskErrored = z.infer<typeof taskErroredSchema>;
export type Task = TaskPending | TaskPlanning | TaskExecuting | TaskSequencing | TaskSequenced | TaskResolved | TaskErrored;
export declare const taskSchema: z.ZodType<Task>;
export type TaskStatusToType = {
    [TaskStatus.Pending]: TaskPending;
    [TaskStatus.Planning]: TaskPlanning;
    [TaskStatus.Executing]: TaskExecuting;
    [TaskStatus.Sequencing]: TaskSequencing;
    [TaskStatus.Sequenced]: TaskSequenced;
    [TaskStatus.Resolved]: TaskResolved;
    [TaskStatus.Errored]: TaskErrored;
};
export type TaskStatusesToType<Statuses> = Statuses extends TaskStatus[] ? Statuses[number] extends TaskStatus ? TaskStatusToType[Statuses[number]] : never : Statuses extends TaskStatus ? TaskStatusToType[Statuses] : never;
