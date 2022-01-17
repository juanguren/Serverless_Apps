import { params } from '@serverless/cloud';
import sendGrid from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

export const requestEmailService = async (
  messageContent: Error | any,
  toEmail: string,
) => {
  const { SENDGRID_KEY } = params;
  const { name, message } = messageContent;
  try {
    sendGrid.setApiKey(SENDGRID_KEY);
    const content = {
      to: toEmail,
      from: 'juanararo@unisabana.edu.co',
      subject: `${name}`,
      text: `${message}`,
      html: `<strong> ${message} </strong>`,
    };

    await sendGrid.send(content);
  } catch (error) {
    console.log({ error });
  }
};
