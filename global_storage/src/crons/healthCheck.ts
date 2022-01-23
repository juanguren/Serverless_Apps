import { schedule, params } from '@serverless/cloud';
import requestHealthEndpoint from '../services/healthCheckService';
import { requestEmailService } from '../services/sendGridService';

const healthCheckCron = (): void => {
  const { INSTANCE_BASE_URL, MY_EMAIL = undefined } = params;

  schedule.every('2 hours', async () => {
    try {
      if (INSTANCE_BASE_URL) {
        const health = await requestHealthEndpoint(INSTANCE_BASE_URL);
        return console.log({ health });
      }
      return console.log(
        'Please include the INSTANCE_BASE_URL key in cloud params',
      );
    } catch (error) {
      console.log(error);
      // Having your email as param on your serverless cloud instance is optional.
      if (MY_EMAIL) await requestEmailService(error, MY_EMAIL);
    }
  });
};

export { healthCheckCron };
