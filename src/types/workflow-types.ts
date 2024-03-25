import z from 'zod';
import { taskSchema } from './task-types.js';

export const WorkflowStatus = {
  Running: 'Running',
  Completed: 'Completed',
  Failed: 'Failed',
  Paused: 'Paused',
  TimedOut: 'TimedOut',
} as const;
export type WorkflowStatus = (typeof WorkflowStatus)[keyof typeof WorkflowStatus];

export const workflowSchema = z.object({
  workflowId: z.string(),
  root: taskSchema,
  modules: z.array(z.string()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  orgId: z.string(),
});
export type Workflow = z.infer<typeof workflowSchema>;

export const workflowInfoSchema = z.object({
  workflowId: z.string(),
  modules: z.array(z.string()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  // Task summary
  description: z.string(),
  status: z.nativeEnum(WorkflowStatus),
  numLeafTasks: z.number(),
});
export type WorkflowInfo = z.infer<typeof workflowInfoSchema>;
