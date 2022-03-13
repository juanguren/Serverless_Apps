import { api, Request, Response } from '@serverless/cloud';
import {
  generateOrder,
  validateUser,
} from './middlewares/order-generation';
import { userRegistration } from './middlewares/user-registration';

api.get('/main', (_req: Request, res: Response) => res.send('OK'));

// Register users and trigger an event that delivers an email to each
api.post('/signup', userRegistration);

// Select the payment provider and create an order
api.post('/:provider/', validateUser, generateOrder);

api.get('/*', (_req: Request, res: Response) =>
  res.redirect('/main'),
);
