import { api } from '@serverless/cloud';
import { retrieveHistoricalData } from './src/controllers/api_calls/historicalreturns';
import { validateTickerExists } from './src/controllers/api_calls/validators';

api.get(
  '/data/historical/:ticker',
  validateTickerExists,
  retrieveHistoricalData
);
