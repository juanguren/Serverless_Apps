import { data } from '@serverless/cloud';
import { LoggerFactory } from '../factories/abstract/logger-class';
import { sendEmail } from '../services/sendgrid.service';

const logger = LoggerFactory.createLogger();

data.on('created', async (event) => {
  const { item: user } = event;
  const { email: userEmail } = user;
  try {
    const emailOperation = await sendEmail(userEmail);

    logger.info(
      `Email sent to ${emailOperation.recipient} ${emailOperation.response}`,
    );
  } catch (error) {
    logger.error({ error });
  }
});
