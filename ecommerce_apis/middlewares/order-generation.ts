import { data, Request, Response } from '@serverless/cloud';
import { LoggerFactory } from '../factories/abstract/logger-class';
import { Order } from '../factories/factory/orders';

const logger = LoggerFactory.createLogger();

const validateUser = async (
  req: Request,
  res: Response,
  next: CallableFunction,
) => {
  const { username } = req.body;
  if (username) {
    const user = await data.get(`${username}`);
    if (user) return next();

    logger.error(`User *${username}* not found`);
    return res.status(400).json({ message: 'Invalid username' });
  }
  return res
    .status(404)
    .json({ message: 'Please provide a username' });
};

const generateOrder = async (req: Request, res: Response) => {
  const { provider } = req.params;
  const { items } = req.body;

  try {
    const order = new Order(provider.toUpperCase(), items);
    const preCheckoutOrder = await order.create();
    res.send(preCheckoutOrder);
  } catch (error) {
    logger.error(error);
    res.status(error.status || 400).send({ error: `${error}` });
  }
};

export { validateUser, generateOrder };
