import z from 'zod';
export declare const getWorkflowsResSchema: z.ZodObject<{
    workflowInfos: z.ZodArray<z.ZodObject<{
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
    }>, "many">;
}, "strip", z.ZodTypeAny, {
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
export type GetWorkflowsRes = z.infer<typeof getWorkflowsResSchema>;
export declare const getWorkflowByIdReqSchema: z.ZodObject<{
    workflowId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    workflowId: string;
}, {
    workflowId: string;
}>;
export declare const getWorkflowByIdResSchema: z.ZodObject<{
    workflow: z.ZodType<import("../types/task-types.js").Task, z.ZodTypeDef, import("../types/task-types.js").Task>;
}, "strip", z.ZodTypeAny, {
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
        subtasks: import("../types/task-types.js").Task[];
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
        subtasks: import("../types/task-types.js").Task[];
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
export type GetWorkflowByIdReq = z.infer<typeof getWorkflowByIdReqSchema>;
export type GetWorkflowByIdRes = z.infer<typeof getWorkflowByIdResSchema>;
export declare const postWorkflowsReqSchema: z.ZodObject<{
    query: z.ZodString;
    modules: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    opts: z.ZodOptional<z.ZodObject<{
        maxFunctionMatches: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        maxFunctionMatches?: number | undefined;
    }, {
        maxFunctionMatches?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
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
export declare const postWorkflowsResSchema: z.ZodObject<{
    message: z.ZodString;
    workflowId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    workflowId: string;
}, {
    message: string;
    workflowId: string;
}>;
export type PostWorkflowsReq = z.infer<typeof postWorkflowsReqSchema>;
export type PostWorkflowsRes = z.infer<typeof postWorkflowsResSchema>;
