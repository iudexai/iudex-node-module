/// <reference types="node" />
/// <reference types="node" />
export declare const config: {
    isInstrumented: boolean;
    nativeConsole: {
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
};
export declare const nativeConsole: {
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
export declare function convertSeverityTextToNumber(severityText: string | undefined): 1 | 5 | 9 | 13 | 17 | 21 | undefined;
export declare function convertSeverityValuesToLevel(severityNumber: number | undefined, severityText?: string | undefined): string;
export declare function getCallerInfo(frameDepth: number): {
    filePath?: string;
    lineNum?: number;
    caller?: string;
};
/**
 * Flattens nested object keys into dot-separated strings.
 * e.g. {a.b.c: 1, a.d: 2, e: 3}
 */
export declare function flattenObject(obj?: Record<string, any>, parentKey?: string, result?: Record<string, any>, seen?: Set<any>, maxObjectKeys?: number, maxDepth?: number): Record<string, any> | undefined;
export declare function emitOtelLog({ level, body, severityNumber, attributes, stackDepth, }: {
    level: string;
    body: any;
    severityNumber?: number;
    attributes?: Record<string, any>;
    stackDepth?: number;
}): void;
