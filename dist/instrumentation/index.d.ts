export * from './utils.js';
export * as iudexPino from './pino.js';
export * as iudexPinoHttp from './pino-http.js';
export * as iudexFastify from './fastify.js';
export * as iudexConsole from './console.js';
export * as iudexTrpc from './trpc.js';
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
export declare function trackAttribute(key: string, value: any): void;
/**
 * Trace decorator
 */
export declare function withTracing<T extends (...args: any) => any>(fn: T, ctx?: {
    name?: string;
    trackArgs?: boolean;
    attributes?: Record<string, any>;
}): T;
