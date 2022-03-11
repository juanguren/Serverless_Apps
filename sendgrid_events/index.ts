import { api, Request, Response } from '@serverless/cloud';
import { userRegistration } from './middlewares/user.service';

api.get('/main', (req: Request, res: Response) => res.send('OK'));

api.post('/signup', userRegistration);

api.get('/*', (req: Request, res: Response) => res.redirect('/main'));
