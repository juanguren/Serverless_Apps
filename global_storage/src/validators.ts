import { data } from '@serverless/cloud';

const isKeyNameDuplicated = async (key: string) => {
  const checkSchema = await data.get(key);
  return checkSchema ? true : false;
};

export { isKeyNameDuplicated };
