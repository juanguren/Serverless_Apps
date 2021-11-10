import { api } from '@serverless/cloud';
import { retrieveHistoricalData } from './src/controllers/api_calls/historicalreturns';
import { validateTickerExists } from './src/controllers/api_calls/validators';

/*api.get(
  '/data/historical/:ticker',
  validateTickerExists,
  retrieveHistoricalData
);*/

api.get('/data/historical/:ticker', async (req, res) => {
  let ticker = req.params.ticker;
  try {
    await retrieveHistoricalData(req, res, ticker);
  } catch (error) {
    return res.status(500).json(error);
  }
});
