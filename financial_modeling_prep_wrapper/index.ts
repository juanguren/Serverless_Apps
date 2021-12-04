import { api } from '@serverless/cloud';
import { retrieveHistoricalData } from './src/controllers/api_calls/historicalreturns';
import { dataForRequest } from './src/controllers/dataInterface';
import { validateTickerExists } from './src/controllers/api_calls/validators';

/*api.get(
  '/data/historical/:ticker',
  validateTickerExists,
  retrieveHistoricalData
);*/

// * https://billowing-tree-gge03.cloud.serverless.com/data/historical/GME/2020-11-01/2021-12-04
api.get('/data/historical/:ticker/:fromDate/:toDate', async (req, res) => {
  const { fromDate: from, toDate: to, ticker } = req.params;
  const data: dataForRequest = { from, to, ticker };
  try {
    if (!from || !to || !ticker)
      throw { code: 404, message: 'Empty body, please include a time_range' };
    await retrieveHistoricalData(req, res, data);
  } catch (error) {
    const { code, message } = error;
    return res.status(code).json({ message });
  }
});
