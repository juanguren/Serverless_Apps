import { api, Request, Response } from '@serverless/cloud';
import { userRegistration } from './middlewares/user.service';

api.get('/main', (req: Request, res: Response) => {
  res.send('OK');
});

api.get('/signup', userRegistration);

api.get('/*', (req, res) => {
  res.redirect('/main');
});
