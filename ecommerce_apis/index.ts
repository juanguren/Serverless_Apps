import { api, Request, Response } from '@serverless/cloud';
import {
  generateOrder,
  updateOrderStatus,
} from './middlewares/order';
import { userRegistration } from './middlewares/user-registration';
import { validateUser } from './middlewares/user-validations';

api.get('/main', (_req: Request, res: Response) => res.send('OK'));

// Register users and trigger an event that delivers an email to each
api.post('/signup', userRegistration);

// Select the payment provider and create an order
api.post('/:provider/', validateUser, generateOrder);

// Update the order status
api.put('/status/:orderId', validateUser, updateOrderStatus);

// Fallback
api.get('/*', (_req: Request, res: Response) =>
  res.redirect('/main'),
);
