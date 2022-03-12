import { api, Request, Response } from '@serverless/cloud';
import { Order } from './factories/factory/orders';
import { userRegistration } from './middlewares/user-registration';
import getJsonApiData from './services/json-promise.service';

api.get('/main', (req: Request, res: Response) => res.send('OK'));

api.post('/signup', userRegistration);

api.get('/promises', getJsonApiData);

api.get('/:payment/:amount', async (req: Request, res: Response) => {
  const { payment, amount } = req.params;

  const order = new Order(payment, amount);
  order.create();

  res.send(order);
});

api.get('/*', (req: Request, res: Response) => res.redirect('/main'));
