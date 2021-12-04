import { data, params } from '@serverless/cloud';
import axios from 'axios';
import { dataForRequest } from '../dataInterface';

const retrieveHistoricalData = async (req, res, data: dataForRequest) => {
  const { API_KEY } = params;
  const { from, to, ticker } = data;

  try {
    const financials = await axios.get(
      `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?from=${from}&to=${to}&apikey=${API_KEY}`
    );
    const returnMessage = {
      symbol: financials.data.symbol,
      data: financials.data.historical.reverse(),
    };

    return res.status(200).json(returnMessage);
  } catch (error) {
    const status = error.statusCode || 400;
    throw { message: `Error while fetching data from ${ticker}`, code: status };
  }
};

export { retrieveHistoricalData };
