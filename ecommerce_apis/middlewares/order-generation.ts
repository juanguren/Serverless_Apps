import { data, Request, Response } from '@serverless/cloud';
import { LoggerFactory } from '../factories/abstract-logger/logger-class';
import { Order } from '../factories/factory-orders/orders';
import { IUser } from './types';

const logger = LoggerFactory.createLogger();

const validateUser = async (req: Request, res: Response) => {
  const { username } = req.body;
  if (username) {
    const user = (await data.get(`${username}`)) as IUser;
    if (user) return generateOrder(req, res, user);

    logger.error(`User *${username}* not found`);
    return res.status(400).json({ message: 'Invalid username' });
  }
  return res
    .status(404)
    .json({ message: 'Please provide a username' });
};

const generateOrder = async (
  req: Request,
  res: Response,
  user: IUser,
) => {
  const { provider } = req.params;
  const { items } = req.body;
  const { id: userId } = user;

  try {
    const order = new Order(provider.toUpperCase(), items);
    const preCheckoutOrder = await order.create();

    const { id } = preCheckoutOrder;
    await data.set(id, {
      ...preCheckoutOrder,
      userId,
    });

    res.send(preCheckoutOrder);
  } catch (error) {
    logger.error(error);
    res.status(error.status || 400).send({ error: `${error}` });
  }
};

export { validateUser, generateOrder };
