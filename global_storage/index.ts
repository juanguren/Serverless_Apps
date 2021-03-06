import { api, Request, Response } from '@serverless/cloud';
import {
  validateUserToken,
  userKeyGuard,
} from './src/middleware/validator-middleware';
import { healthCheckCron } from './src/jobs/healthCheck';
import {
  createDataRecord,
  deleteDataRecord,
  getDataRecord,
} from './src/services/cloud.service';
import { validateRecordExists } from './src/middleware/records-middleware';

// Starts the health cron job
healthCheckCron();

// Health endpoint
api.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Healthy',
  });
});

// Application-level middleware
// Validates user token exists as a secret in serverless cloud's dashboard
api.use(validateUserToken);

// Retrieves data record by key
api.get('/data/:key', userKeyGuard, getDataRecord);

// Creates a new data record
api.post('/data', userKeyGuard, createDataRecord);

// Erases an existing data record
api.delete('/data/:key', validateRecordExists, deleteDataRecord);

// Redirects back to Health endpoint
api.post('/*', (req: Request, res: Response) => res.redirect('/'));

// Fallback endpoint
api.use((_req: Request, res: Response) => {
  res
    .status(404)
    .json({ error: 'Incorrect route or missing params' });
});
