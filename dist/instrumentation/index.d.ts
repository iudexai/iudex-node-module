export * from './utils.js';
export * as iudexPino from './pino.js';
export * as iudexFastify from './fastify.js';
export * as iudexConsole from './console.js';
export declare function instrument({ baseUrl, iudexApiKey, serviceName, instanceId, gitCommit, githubUrl, env, headers: configHeaders, settings, }?: {
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
export declare function withTracing<T extends (...args: any) => any>(fn: T, ctx?: {
    name: string | symbol;
}): T;
