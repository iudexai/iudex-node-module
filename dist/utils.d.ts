export declare function setTimeoutPromise(ms: number): Promise<void>;
export declare function poll<Args extends any[], Ret>(fn: (...args: Args) => Promise<Ret>, args: Args, { maxTries, tries, waitMs, }?: {
    maxTries: number;
    tries: number;
    waitMs: number;
}): Promise<NonNullable<Ret>>;
export type DeconstructedPromise<T> = {
    promise: Promise<T>;
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
};
export declare function deconstructedPromise<T>(): DeconstructedPromise<T>;
