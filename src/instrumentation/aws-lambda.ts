import { Handler } from 'aws-lambda';

import { withTracing as baseWithTracing } from './trace.js';
import { setAttribute, setError } from './index.js';
import { set } from 'lodash';


export function withTracing<Event, Result>(
  fn: Handler<Event, Result>,
  ctx: { name: string, timeoutBuffer?: number },
): Handler<Event, Result> {
  const wrapper: Handler<Event, Result> = (event, context, cb) => {
    const remainingTimeMs = context.getRemainingTimeInMillis?.();
    if (remainingTimeMs) {
      setTimeout(() => {
        setError(new Error(`${ctx.name} timeout`));
      }, remainingTimeMs - (ctx.timeoutBuffer ?? 100));
    }

    // Extract from context
    context.callbackWaitsForEmptyEventLoop
      && setAttribute('aws.callbackWaitsForEmptyEventLoop', context.callbackWaitsForEmptyEventLoop);
    context.functionName
      && setAttribute('aws.functionName', context.functionName);
    context.functionVersion
      && setAttribute('aws.functionVersion', context.functionVersion);
    context.invokedFunctionArn
      && setAttribute('aws.invokedFunctionArn', context.invokedFunctionArn);
    context.memoryLimitInMB
      && setAttribute('aws.memoryLimitInMB', context.memoryLimitInMB);
    context.awsRequestId
      && setAttribute('aws.awsRequestId', context.awsRequestId);
    context.logGroupName
      && setAttribute('aws.logGroupName', context.logGroupName);
    context.logStreamName
      && setAttribute('aws.logStreamName', context.logStreamName);

    return fn(event, context, cb);
  };
  return baseWithTracing(wrapper, {
    name: ctx.name,
  });
}
