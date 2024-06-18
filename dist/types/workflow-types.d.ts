import z from 'zod';
export declare const WorkflowStatus: {
    readonly Running: "Running";
    readonly Completed: "Completed";
    readonly Failed: "Failed";
    readonly Paused: "Paused";
    readonly TimedOut: "TimedOut";
};
export type WorkflowStatus = (typeof WorkflowStatus)[keyof typeof WorkflowStatus];
export declare const workflowMetadataSchema: z.ZodObject<{
    maxFunctionMatches: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    maxFunctionMatches?: number | undefined;
}, {
    maxFunctionMatches?: number | undefined;
}>;
export type WorkflowMetadata = z.infer<typeof workflowMetadataSchema>;
export declare const workflowSchema: z.ZodObject<{
    workflowId: z.ZodString;
    root: z.ZodType<import("./task-types.js").Task, z.ZodTypeDef, import("./task-types.js").Task>;
    modules: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    metadata: z.ZodOptional<z.ZodObject<{
        maxFunctionMatches: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        maxFunctionMatches?: number | undefined;
    }, {
        maxFunctionMatches?: number | undefined;
    }>>;
    orgId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    workflowId: string;
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
        subtasks: import("./task-types.js").Task[];
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
    createdAt: string;
    updatedAt: string;
    orgId: string;
    modules?: string[] | undefined;
    metadata?: {
        maxFunctionMatches?: number | undefined;
    } | undefined;
}, {
    workflowId: string;
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
        subtasks: import("./task-types.js").Task[];
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
    createdAt: string;
    updatedAt: string;
    orgId: string;
    modules?: string[] | undefined;
    metadata?: {
        maxFunctionMatches?: number | undefined;
    } | undefined;
}>;
export type Workflow = z.infer<typeof workflowSchema>;
export declare const workflowInfoSchema: z.ZodObject<{
    workflowId: z.ZodString;
    modules: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    description: z.ZodString;
    status: z.ZodNativeEnum<{
        readonly Running: "Running";
        readonly Completed: "Completed";
        readonly Failed: "Failed";
        readonly Paused: "Paused";
        readonly TimedOut: "TimedOut";
    }>;
    numLeafTasks: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
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
export type WorkflowInfo = z.infer<typeof workflowInfoSchema>;
