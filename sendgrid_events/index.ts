import { api, Request, Response } from '@serverless/cloud';
import { userRegistration } from './middlewares/user-registration';
import getJsonApiData from './services/json-promise.service';

api.get('/main', (req: Request, res: Response) => res.send('OK'));

api.post('/signup', userRegistration);

api.get('/promises', getJsonApiData);

api.get('/*', (req: Request, res: Response) => res.redirect('/main'));
