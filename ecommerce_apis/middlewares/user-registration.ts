import { data, events, Request, Response } from '@serverless/cloud';
import { throwError } from '../helpers/error.helper';
import { nanoid } from 'nanoid';
import { LoggerFactory } from '../factories/abstract-logger/logger-class';
import { IUser } from './types';
import { sendEmail } from '../services/sendgrid.service';
import EventBus from '../events/event.bus';

const logger = LoggerFactory.createLogger();
const event = new EventBus();

export const userRegistration = async (
  req: Request,
  res: Response,
) => {
  event.listen('hey', async (body) => {
    logger.info(body);
  });

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

    event.emit('hey', 'HEEEEY');

    await events.publish('user.created', savedNewUser);

    res.send({ newUser: savedNewUser });
  } catch (error) {
    logger.error({ error });
    throwError(req, res, { error });
  }
};

const userExists = async (username: string) => {
  const response = await data.get(username);

  return response;
};

events.on('user.created', async ({ body }) => {
  const { email: userEmail } = body;
  try {
    const emailOperation = await sendEmail(userEmail);

    logger.info(
      `${emailOperation.response} Email sent to ${emailOperation.recipient}`,
    );
  } catch (error) {
    logger.error({ error });
  }
});
