import { api, data, schedule, params } from '@serverless/cloud';
import { retrieveHistoricalData } from './src/controllers/api_calls/historicalreturns';
import { validateTickerExists } from './src/controllers/api_calls/validators';

// Create GET route and return users
api.get(
  '/data/historical/:ticker',
  validateTickerExists,
  retrieveHistoricalData
);
