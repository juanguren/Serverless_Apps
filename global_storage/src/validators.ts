import { data } from '@serverless/cloud';

const isKeyNameDuplicated = async (key: string) =>
  await data.get(key);

export { isKeyNameDuplicated };
