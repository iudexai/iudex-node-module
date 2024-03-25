// Optional type
declare type Maybe<T> = T | undefined;
// Defining possibly as the nullable version of maybe
declare type Possibly<T> = T | undefined | null;

// JSON primitives
declare type Json = string | number | boolean | null | JsonArray | JsonObject;
declare interface JsonObject extends Record<string, Json> {}
declare interface JsonArray extends Array<Json> {}

// Type for any function. "Function" is too permissive.
declare type AnyFunction = (...args: any[]) => any;
// Extracts type from an array, otherwise returns the type itself.
declare type ExtractFromArray<T> = T extends any[] ? T[number] : T;

// Compile time type tests
// https://github.com/total-typescript/ts-reset/blob/main/src/tests/utils.ts
declare type Expect<T extends true> = T;
declare type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T,
>() => T extends Y ? 1 : 2
  ? true
  : false;
declare type Extends<DERIVED_VALUE, VALUE> = DERIVED_VALUE extends VALUE
  ? true
  : false;

declare type MappedReturnType<T extends Record<string, AnyFunction>> = {
  [K in keyof T]: ReturnType<T[K]>;
}
type UnionToIntersection<U> =
  (U extends any ? (x: U)=>void : never) extends ((x: infer I)=>void) ? I : never