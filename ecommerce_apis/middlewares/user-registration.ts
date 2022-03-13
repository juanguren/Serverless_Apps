import { data, Request, Response } from '@serverless/cloud';
import { throwError } from '../helpers/error.helper';
import { nanoid } from 'nanoid';
import { LoggerFactory } from '../factories/abstract/logger-class';
import { UserManager } from '../events/data.events';

const logger = LoggerFactory.createLogger();

export const userRegistration = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = req.body;
    const id = nanoid();
    user['id'] = id;

    const newUser = new UserManager();
    const response = await newUser.create(user);

    res.send(response);
  } catch (error) {
    logger.error({ error });
    throwError(req, res, { error });
  }
};
