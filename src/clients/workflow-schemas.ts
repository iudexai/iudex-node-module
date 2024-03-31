import z from 'zod';

import { taskSchema } from '../types/task-types.js';
import { workflowInfoSchema } from '../types/workflow-types.js';

export const getWorkflowsResSchema = z.object({
  workflowInfos: z.array(workflowInfoSchema),
});
export type GetWorkflowsRes = z.infer<typeof getWorkflowsResSchema>;

export const getWorkflowByIdReqSchema = z.object({
  workflowId: z.string(),
});
export const getWorkflowByIdResSchema = z.object({
  workflow: taskSchema, // root task
});
export type GetWorkflowByIdReq = z.infer<typeof getWorkflowByIdReqSchema>;
export type GetWorkflowByIdRes = z.infer<typeof getWorkflowByIdResSchema>;

export const postWorkflowsReqSchema = z.object({
  query: z.string(),
  modules: z.array(z.string()).optional(),
  opts: z.object({
    maxFunctionMatches: z.number().optional(),
  }).optional(),
});
export const postWorkflowsResSchema = z.object({
  message: z.string(),
  workflowId: z.string(),
});
export type PostWorkflowsReq = z.infer<typeof postWorkflowsReqSchema>;
export type PostWorkflowsRes = z.infer<typeof postWorkflowsResSchema>;
