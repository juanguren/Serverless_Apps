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
        subject: '',
        text: '',
        html: '',
      };
      await mail.send(emailObject);

      logger.info(`Email sent to ${recipient}`);

      return { message: 'Message sent', recipient };
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
