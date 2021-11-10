import { data, params } from '@serverless/cloud';
import axios from 'axios';

const retrieveHistoricalData = async (req, res, ticker: string = 'GME') => {
  const { API_KEY } = params;
  try {
    const financials = await axios.get(
      `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?from=2018-03-12&to=2019-03-12&apikey=${API_KEY}`
    );
    const returnMessage = {
      symbol: financials.data.symbol,
      data: financials.data.historical.reverse(),
    };

    return res.status(200).json(returnMessage);
  } catch (error) {
    const status = error.statusCode || 500;
    const errorMessage = { message: 'Error while fetching data', ticker };
    return res.status(status).json(errorMessage);
  }
};

export { retrieveHistoricalData };
