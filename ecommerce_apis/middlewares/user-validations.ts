import { data, Request, Response } from '@serverless/cloud';
import { LoggerFactory } from '../factories/abstract-logger/logger-class';
import { generateOrder } from './order';
import { IUser } from './types';

const logger = LoggerFactory.createLogger();

export const validateUser = async (
  req: Request,
  res: Response,
  next: CallableFunction,
) => {
  const { username } = req.body;
  if (username) {
    const user = (await data.get(`${username}`)) as IUser;
    if (user) return next();

    logger.error(`User *${username}* not found`);
    return res.status(400).json({ message: 'Invalid username' });
  }
  return res
    .status(404)
    .json({ message: 'Please provide a username' });
};
