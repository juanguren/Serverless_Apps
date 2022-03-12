import { data, params } from '@serverless/cloud';
import mail from '@sendgrid/mail';
import { ISendGrid } from '../middlewares/types';
import { LoggerFactory } from '../factories/abstract/logger-class';

const { SENDGRID_KEY } = params;
const logger = LoggerFactory.createLogger();

export const sendEmail = async (recipient: string) => {
  try {
    if (SENDGRID_KEY) {
      mail.setApiKey(SENDGRID_KEY);

      const emailObject: ISendGrid = {
        to: recipient,
        from: 'juanararo@unisabana.edu.co',
        subject: 'Welcome to Serverless Cloud!',
        text: 'Lorem Ipsum etc, etc...',
        html: '<strong>Like a baws</strong>',
      };
      const response = await mail.send(emailObject);

      return { recipient, response };
    } else {
      throw {
        message: 'No sendgrid key found',
        code: 404,
      };
    }
  } catch (error) {
    logger.error({ error });
    return error;
  }
};
