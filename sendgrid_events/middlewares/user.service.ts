import { data, Request, Response } from '@serverless/cloud';
import { throwError } from '../helpers/error.helper';
import { nanoid } from 'nanoid';
import { LoggerFactory } from '../factories/abstract/logger-class';

const logger = LoggerFactory.createLogger();

export const userRegistration = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = req.body;
    const id = nanoid();
    user['id'] = id;

    const createdUser = await data.set(`${id}`, {
      ...user,
      createdAt: new Date().toISOString(),
    });

    logger.info(`User ${id} registered`);

    res.send({ createdUser });
  } catch (error) {
    logger.error({ error });
    throwError(req, res, { error });
  }
};
