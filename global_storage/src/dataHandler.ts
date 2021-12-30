import { data } from '@serverless/cloud';
import {
  AcceptedData,
  DataAction,
} from './interfaces/dataInterfaces';

const handleData = async (
  req,
  res,
  dataSet: AcceptedData,
  action: DataAction,
) => {
  let {
    keyName = 'key',
    overwrite = undefined,
    timeToLive = undefined,
  } = dataSet.instructions;
  const { content } = dataSet;

  try {
    const option = { overwrite, timeToLive };
    const useOptions =
      Object.entries(option).length === 0 ? undefined : option;
    await data.set(keyName, content, useOptions);

    return res.status(200).json({
      message: action,
      keyName,
    });
  } catch (error) {
    const code = error.statusCode || 500;
    return res.status(code).json(error);
  }
};

export { handleData };