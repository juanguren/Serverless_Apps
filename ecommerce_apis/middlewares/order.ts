import { data, Request, Response } from '@serverless/cloud';
import { LoggerFactory } from '../factories/abstract-logger/logger-class';
import { IOrder, Order } from '../factories/factory-orders/orders';
import { throwError } from '../helpers/error.helper';
import { IUser } from './types';

const logger = LoggerFactory.createLogger();

const generateOrder = async (req: Request, res: Response) => {
  const { provider } = req.params;
  const { items, username } = req.body;

  try {
    const { id: userId } = (await data.get(`${username}`)) as IUser;

    const order = new Order(provider.toUpperCase(), items);
    const preCheckoutOrder = await order.create();
    const { id: orderId } = preCheckoutOrder;

    await data.set(orderId, {
      ...preCheckoutOrder,
      userId,
    });

    res.send(preCheckoutOrder);
  } catch (error) {
    logger.error(error);
    throwError(req, res, { error });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = (await data.get(orderId)) as IOrder;
    order.paymentStatus = status.toLowerCase();

    res.send(order);
  } catch (error) {
    logger.error(error);
    throwError(req, res, { error });
  }
};

export { generateOrder, updateOrderStatus };
