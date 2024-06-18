export type AnyFunction = (...args: any[]) => any;
export type MappedReturnType<T extends Record<string, AnyFunction>> = {
  [K in keyof T]: ReturnType<T[K]>;
}
