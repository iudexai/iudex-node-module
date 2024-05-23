import z from 'zod';

export const TaskStatus = {
  // Queued state
  Pending: 'Pending', // awaiting processing
  // Processing states
  Planning: 'Planning', // in programmer
  Executing: 'Executing', // in executor
  Sequencing: 'Sequencing', // in sequencer
  // Terminal states
  Resolved: 'Resolved', // execution resolved task
  Sequenced: 'Sequenced', // no resolution; sequuencer created subtasks
  Errored: 'Errored', // unrecoverable error during processing
} as const;
export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export const TerminalTaskStatuses = [
  TaskStatus.Resolved,
  TaskStatus.Sequenced,
  TaskStatus.Errored,
] as const;

export const baseTaskSchema = z.object({
  id: z.string(),
  description: z.string(),
  status: z.nativeEnum(TaskStatus),
  stepIndex: z.number(),
  depth: z.number(),
  numRewrites: z.number(),
});
export type BaseTask = z.infer<typeof baseTaskSchema>;

// Task judgement types

export const Feasibility = {
  Feasible: 'Feasible',
  Rewritable: 'Rewritable',
  Infeasible: 'Infeasible',
} as const;
export type Feasibility = (typeof Feasibility)[keyof typeof Feasibility];

export const feasibilityCheckSchema = z.object({
  feasibility: z.nativeEnum(Feasibility),
  reason: z.coerce.string(),
  fix: z.string().optional(),
});
export type FeasibilityCheck = z.infer<typeof feasibilityCheckSchema>;

export const Resolution = {
  Resolved: 'Resolved',
  Rewritable: 'Rewritable',
  Infeasible: 'Infeasible',
} as const;
export type Resolution = (typeof Resolution)[keyof typeof Resolution];

export const resolutionCheckSchema = z.object({
  resolution: z.nativeEnum(Resolution),
  reason: z.coerce.string(),
  fix: z.string().optional(),
});
export type ResolutionCheck = z.infer<typeof resolutionCheckSchema>;

// Disambiguation of task statuses and required data

export const taskPendingSchema = baseTaskSchema.extend({
  status: z.literal(TaskStatus.Pending),
});
export type TaskPending = z.infer<typeof taskPendingSchema>;

export const taskPlanningSchema = baseTaskSchema.extend({
  status: z.literal(TaskStatus.Planning),
  // present if rewriting
  program: z.string().optional(),
  feasibilityCheck: feasibilityCheckSchema.optional(),
  // present if rewriting from executor
  resolutionCheck: resolutionCheckSchema.optional(),
});
export type TaskPlanning = z.infer<typeof taskPlanningSchema>;

export const taskExecutingSchema = baseTaskSchema.extend({
  status: z.literal(TaskStatus.Executing),
  program: z.string(),
  usedFunctionNames: z.array(z.string()),
  feasibilityCheck: feasibilityCheckSchema,
});
export type TaskExecuting = z.infer<typeof taskExecutingSchema>;

export const taskResolvedSchema = baseTaskSchema.extend({
  status: z.literal(TaskStatus.Resolved),
  program: z.string(),
  usedFunctionNames: z.array(z.string()),
  feasibilityCheck: feasibilityCheckSchema,
  resolutionCheck: resolutionCheckSchema,
});
export type TaskResolved = z.infer<typeof taskResolvedSchema>;

export const taskSequencingSchema = baseTaskSchema.extend({
  status: z.literal(TaskStatus.Sequencing),
  program: z.string(),
  feasibilityCheck: feasibilityCheckSchema,
  // present if sequencing from executor
  usedFunctionNames: z.array(z.string()).optional(),
  resolutionCheck: resolutionCheckSchema.optional(),
});
export type TaskSequencing = z.infer<typeof taskSequencingSchema>;

export type TaskSequenced = z.infer<typeof baseTaskSchema> & {
  status: 'Sequenced'; // NOTE: should use TaskStatus but compiler thinks it's the type
  program: string;
  subtasks: Task[];
  feasibilityCheck: FeasibilityCheck;
  usedFunctionNames?: string[];
  resolutionCheck?: ResolutionCheck;
};
export const taskSequencedSchema: z.ZodType<TaskSequenced> = baseTaskSchema.extend({
  status: z.literal(TaskStatus.Sequenced),
  program: z.string(),
  subtasks: z.lazy(() => taskSchema.array()),
  feasibilityCheck: feasibilityCheckSchema,
  usedFunctionNames: z.array(z.string()).optional(),
  resolutionCheck: resolutionCheckSchema.optional(),
});

export const taskErroredSchema = baseTaskSchema.extend({
  status: z.literal(TaskStatus.Errored),
  errorMsg: z.string(),
  errorName: z.string(),
  errorStack: z.string().optional(),
});
export type TaskErrored = z.infer<typeof taskErroredSchema>;

// Task union types

export type Task =
  | TaskPending
  | TaskPlanning
  | TaskExecuting
  | TaskSequencing
  | TaskSequenced
  | TaskResolved
  | TaskErrored;
export const taskSchema: z.ZodType<Task> = z.union([
  taskPendingSchema,
  taskPlanningSchema,
  taskExecutingSchema,
  taskResolvedSchema,
  taskSequencingSchema,
  taskSequencedSchema,
  taskErroredSchema,
]);

export type TaskStatusToType = {
  [TaskStatus.Pending]: TaskPending;
  [TaskStatus.Planning]: TaskPlanning;
  [TaskStatus.Executing]: TaskExecuting;
  [TaskStatus.Sequencing]: TaskSequencing;
  [TaskStatus.Sequenced]: TaskSequenced;
  [TaskStatus.Resolved]: TaskResolved;
  [TaskStatus.Errored]: TaskErrored;
};

export type TaskStatusesToType<Statuses> =
  Statuses extends TaskStatus[]
    ? Statuses[number] extends TaskStatus
      ? TaskStatusToType[Statuses[number]]
      : never
    : Statuses extends TaskStatus
      ? TaskStatusToType[Statuses]
      : never;
