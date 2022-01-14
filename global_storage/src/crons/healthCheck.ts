import { schedule, params } from '@serverless/cloud';
import requestHealthEndpoint from '../services/healthCheckService';

const healthCheckCron = (): void => {
  const { INSTANCE_BASE_URL, HEY } = params;

  schedule.every('30 minutes', async () => {
    try {
      if (INSTANCE_BASE_URL) {
        const health = await requestHealthEndpoint(INSTANCE_BASE_URL);
        return console.log({ health });
      }
      return;
    } catch (error) {
      console.log(error);
      // call sendgrid here
    }
  });
};

export { healthCheckCron };
