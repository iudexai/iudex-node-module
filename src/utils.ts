export function setTimeoutPromise(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function poll<Args extends any[], Ret>(
  fn: (...args: Args) => Promise<Ret>,
  args: Args,
  {
    maxTries,
    tries,
    waitMs,
  }: {
    maxTries: number;
    tries: number;
    waitMs: number;
  } = { maxTries: 60, tries: 0, waitMs: 1000 },
): Promise<NonNullable<Ret>> {
  if (tries >= maxTries) {
    throw Error(
      `Polling failed after ${maxTries} tries for function ${fn.name}.`,
    );
  }
  return fn(...args).then(res => {
    if (res == null) {
      return setTimeoutPromise(waitMs)
        .then(() => poll(fn, args, { maxTries, tries: tries + 1, waitMs }));
    }
    return res;
  });
}
