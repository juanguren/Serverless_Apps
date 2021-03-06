import { data, params } from '@serverless/cloud';
import mail from '@sendgrid/mail';
import { ISendGrid } from '../middlewares/types';
import { LoggerFactory } from '../factories/abstract-logger/logger-class';
import { EmailTemplates } from '../middlewares/user-registration';

const { SENDGRID_KEY } = params;
const logger = LoggerFactory.createLogger();

export const sendEmail = async (
  recipient: string,
  subject: EmailTemplates,
) => {
  try {
    if (SENDGRID_KEY) {
      mail.setApiKey(SENDGRID_KEY);

      const emailObject: ISendGrid = {
        to: recipient,
        from: 'juanararo@unisabana.edu.co',
        subject,
        text: 'Lorem Ipsum etc, etc...',
        html: '<strong>LFG</strong>',
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
