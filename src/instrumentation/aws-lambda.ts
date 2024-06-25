import { Handler } from 'aws-lambda';

import { withTracing as baseWithTracing } from './trace.js';


export function withTracing<Event, Result>(
  fn: Handler<Event, Result>,
  ctx: { name: string },
): Handler<Event, Result> {
  return baseWithTracing(fn, {
    name: ctx.name,
  });
}
