import { data, Request, Response } from '@serverless/cloud';
import { LoggerFactory } from '../factories/abstract-logger/logger-class';
import { Order } from '../factories/factory-orders/orders';
import {
  IOrder,
  OrderStatus,
} from '../factories/factory-orders/types';
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

const handleOrderComplete = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const statusComplete: OrderStatus = OrderStatus.COMPLETED;
  try {
    const updatedData = await updateOrderStatus(
      orderId,
      statusComplete,
    );
    logger.info(`Order ${orderId} was completed`);

    return res.send(updatedData);
  } catch (error) {
    const errorStatus = error?.status | 400;

    logger.error(error);
    return res.status(errorStatus).json(error);
  }
};

const handleOrderCancellation = async (
  req: Request,
  res: Response,
) => {
  const { orderId } = req.params;
  const statusFailed: OrderStatus = OrderStatus.CANCELLED;
  try {
    const updatedData = await updateOrderStatus(
      orderId,
      statusFailed,
    );
    logger.info(`Order ${orderId} was cancelled`);

    return res.send(updatedData);
  } catch (error) {
    const errorStatus = error?.status | 400;

    logger.error(error);
    return res.status(errorStatus).json(error);
  }
};

// Helper method
const updateOrderStatus = async (
  orderId: string,
  status: PaymentComplete | any,
) => {
  try {
    const order = (await data.get(orderId)) as IOrder;
    order.paymentStatus = status.toLowerCase();

    return await data.set(orderId, order, {
      overwrite: true,
    });
  } catch (error) {
    return error;
  }
};

export {
  generateOrder,
  handleOrderComplete,
  handleOrderCancellation,
};
