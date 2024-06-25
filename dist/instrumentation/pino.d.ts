import type { DestinationStream, LoggerOptions } from 'pino';
/**
 * Pino write stream to send logs to OpenTelemetry and to default pino destination.
 */
export declare function write(str: string): void;
export declare const config: {
    mixinStackDepth: number;
};
/**
 * Pino mixin stack looks like this:
 * Error
 *  at mixin
 *  options.mixin
 *  at Pino.write
 *  at Pino.LOG
 *  at ..../test/express_instrumentation.test.ts:43:10
 */
export declare function mixin(): Record<string, string | number | undefined>;
export declare const destination: DestinationStream;
export declare const options: LoggerOptions<never>;
export declare const args: readonly [LoggerOptions<never>, DestinationStream];
export declare const iudexPino: {
    write: typeof write;
    config: {
        mixinStackDepth: number;
    };
    mixin: typeof mixin;
    destination: DestinationStream;
    options: LoggerOptions<never>;
    args: readonly [LoggerOptions<never>, DestinationStream];
};
