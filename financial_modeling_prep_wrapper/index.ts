import { api } from '@serverless/cloud';
import { retrieveHistoricalData } from './src/controllers/api_calls/historicalreturns';
import { validateTickerExists } from './src/controllers/api_calls/validators';

/*api.get(
  '/data/historical/:ticker',
  validateTickerExists,
  retrieveHistoricalData
);*/

api.post('/data/historical/:ticker', async (req, res) => {
  let ticker = req.params.ticker;
  try {
    if (!req.body.time_range)
      throw { code: 404, message: 'Empty body, please include a time_range' };
    await retrieveHistoricalData(req, res, ticker);
  } catch (error) {
    const { code, message } = error;
    return res.status(code).json({ message });
  }
});
