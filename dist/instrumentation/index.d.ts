/// <reference types="node" />
/// <reference types="node" />
import { Resource } from '@opentelemetry/resources';
export * from './utils.js';
export * from './trace.js';
export * as iudexPino from './pino.js';
export * as iudexPinoHttp from './pino-http.js';
export * as iudexFastify from './fastify.js';
export * as iudexConsole from './console.js';
export * as iudexTrpc from './trpc.js';
export * as iudexAwsApiGateway from './aws-api-gateway.js';
export * as iudexAwsLambda from './aws-lambda.js';
/**
 * Native console, if you want to use it without logging
 * and without turning off console instrumentation.
 */
export declare const console: {
    assert(condition?: boolean | undefined, ...data: any[]): void;
    assert(value: any, message?: string | undefined, ...optionalParams: any[]): void;
    clear(): void;
    clear(): void;
    count(label?: string | undefined): void;
    count(label?: string | undefined): void;
    countReset(label?: string | undefined): void;
    countReset(label?: string | undefined): void;
    debug(...data: any[]): void;
    debug(message?: any, ...optionalParams: any[]): void;
    dir(item?: any, options?: any): void;
    dir(obj: any, options?: import("util").InspectOptions | undefined): void;
    dirxml(...data: any[]): void;
    dirxml(...data: any[]): void;
    error(...data: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
    group(...data: any[]): void;
    group(...label: any[]): void;
    groupCollapsed(...data: any[]): void;
    groupCollapsed(...label: any[]): void;
    groupEnd(): void;
    groupEnd(): void;
    info(...data: any[]): void;
    info(message?: any, ...optionalParams: any[]): void;
    log(...data: any[]): void;
    log(message?: any, ...optionalParams: any[]): void;
    table(tabularData?: any, properties?: string[] | undefined): void;
    table(tabularData: any, properties?: readonly string[] | undefined): void;
    time(label?: string | undefined): void;
    time(label?: string | undefined): void;
    timeEnd(label?: string | undefined): void;
    timeEnd(label?: string | undefined): void;
    timeLog(label?: string | undefined, ...data: any[]): void;
    timeLog(label?: string | undefined, ...data: any[]): void;
    timeStamp(label?: string | undefined): void;
    timeStamp(label?: string | undefined): void;
    trace(...data: any[]): void;
    trace(message?: any, ...optionalParams: any[]): void;
    warn(...data: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    Console: console.ConsoleConstructor;
    profile(label?: string | undefined): void;
    profileEnd(label?: string | undefined): void;
};
export type InstrumentConfig = {
    baseUrl?: string;
    iudexApiKey?: string;
    publicWriteOnlyIudexApiKey?: string;
    serviceName?: string;
    instanceId?: string;
    gitCommit?: string;
    githubUrl?: string;
    env?: string;
    headers?: Record<string, string>;
    settings?: Partial<{
        instrumentConsole: boolean;
        instrumentWindow: boolean;
        instrumentXhr: boolean;
    }>;
};
export declare function defaultInstrumentConfig(): {
    baseUrl: string;
    iudexApiKey: string | undefined;
    publicWriteOnlyIudexApiKey: string | undefined;
    serviceName: string;
    gitCommit: string | undefined;
    githubUrl: string | undefined;
    env: string | undefined;
    headers: {};
    settings: {};
};
export declare function instrument(instrumentConfig?: InstrumentConfig): {
    updateResource(newResource: Record<string, any>): void;
} | undefined;
export declare function trackAttribute(key: string, value: any): void;
export declare function buildHeaders(instrumentConfig: Pick<InstrumentConfig, 'iudexApiKey' | 'publicWriteOnlyIudexApiKey' | 'headers'>): Record<string, string>;
export declare function buildResource(instrumentConfig: Pick<InstrumentConfig, 'serviceName' | 'instanceId' | 'gitCommit' | 'githubUrl' | 'env'>): Resource;
