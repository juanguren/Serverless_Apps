import { data } from '@serverless/cloud';

const removeTokenFromPayload = (payload: any) => {
  delete payload.token;
  return payload;
};

const getExistingKey = async (key: string): Promise<any> =>
  await data.get(key);

export { removeTokenFromPayload, getExistingKey };
