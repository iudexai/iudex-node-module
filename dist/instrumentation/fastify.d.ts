export declare const stream: import("pino").DestinationStream;
export declare const config: {
    mixinStackDepth: number;
};
/**
 *
 * Error
    at getCallerInfo (/.../instrumentation/utils.ts:65:14)
    at mixin (/.../instrumentation/fastify.ts:2:54)
    at write (/.../pino/lib/proto.js:79:42)
    at LOG (/.../pino/lib/tools.js:33:23)
    at logServerAddress (/.../fastify/lib/server.js:256:18)
    at wrap (/.../fastify/lib/server.js:137:46)
    at <anonymous> (node:http:29:36)
 */
export declare function mixin(): Record<string, string | number | undefined>;
export declare const logger: {
    level: string;
    mixin: typeof mixin;
    stream: import("pino").DestinationStream;
};
export declare const iudexFastify: {
    stream: import("pino").DestinationStream;
    mixin: typeof mixin;
    logger: {
        level: string;
        mixin: typeof mixin;
        stream: import("pino").DestinationStream;
    };
};
