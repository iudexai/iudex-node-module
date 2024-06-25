import 'dotenv/config';
import { instrument } from '../src/instrumentation/index';
instrument({
  serviceName: 'test-ext-instru-script',
  githubUrl: 'https://github.com/iudexai/ghost-shell',
  baseUrl: 'https://pgrev2bga0.execute-api.us-west-2.amazonaws.com',
  env: 'production',
});
