import { data, events, Request, Response } from '@serverless/cloud';
import { throwError } from '../helpers/error.helper';
import { nanoid } from 'nanoid';
import { LoggerFactory } from '../factories/abstract-logger/logger-class';
import { IUser } from './types';
import { sendEmail } from '../services/sendgrid.service';
import EventBus from '../events/event.bus';

const logger = LoggerFactory.createLogger();
const event = new EventBus();

export enum EmailTemplates {
  WELCOME_MESSAGE = 'Welcome to the Ecommerce API!',
  FOLLOW_UP_MESSAGE = "Hey! Don't forget to check out our new products!",
}

export const userRegistration = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = req.body as IUser;
    const { username } = user;

    const existingRecord = await userExists(username);
    if (existingRecord) return res.send({ existingRecord });

    const id = nanoid();
    user['id'] = id;

    const savedNewUser = await data.set(`${username}`, {
      ...user,
      createdAt: new Date().toISOString(),
    });

    await events.publish('user.created', savedNewUser);
    await events.publish(
      'user.followUp',
      { after: '1 day' },
      savedNewUser,
    );

    res.send({ newUser: savedNewUser });
  } catch (error) {
    logger.error({ error });
    throwError(req, res, { error });
  }
};

const userExists = async (username: string) =>
  await data.get(username);

events.on('user.created', async ({ body }) => {
  const { email: userEmail } = body;
  try {
    const emailOperation = await sendEmail(
      userEmail,
      EmailTemplates.WELCOME_MESSAGE,
    );

    logger.info(
      `${emailOperation.response} Email sent to ${emailOperation.recipient}`,
    );
  } catch (error) {
    logger.error({ error });
    throw error;
  }
});

events.on('user.followUp', async ({ body }) => {
  const { email: userEmail } = body;
  try {
    const emailOperation = await sendEmail(
      userEmail,
      EmailTemplates.FOLLOW_UP_MESSAGE,
    );

    logger.info(
      `${emailOperation.response} Follow Up email sent to ${emailOperation.recipient}`,
    );
  } catch (error) {
    logger.error({ error });
    throw error;
  }
});
