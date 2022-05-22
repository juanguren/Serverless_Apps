import { params, Request, Response } from '@serverless/cloud';
import { getExistingKey } from '../utils/utils';

const validateUserToken = (
  req: Request,
  res: Response,
  next: CallableFunction,
) => {
  const { APP_TOKENS } = params;
  const { api_key } = req.headers;
  try {
    if (api_key) {
      const tokenList = APP_TOKENS.split(',');
      if (tokenList.includes(api_key)) return next();
      throw {
        message: 'Incorrect token. User is not authenticated',
        code: 403,
      };
    } else {
      throw { message: 'Please send an api_key header', code: 404 };
    }
  } catch (error) {
    const { code, message } = error;
    res.status(code).json({ message });
  }
};

const userKeyGuard = async (
  req: Request,
  res: Response,
  next: CallableFunction,
) => {
  const { api_key } = req.headers;
  const keyNameClaimedErrorMsg = {
    message: 'Key Name has already being claimed.',
    code: 403,
  };
  try {
    if (req.method == 'POST') {
      const { keyName } = req.body.instructions;
      const data = await getExistingKey(keyName);
      if (data) {
        if (api_key == data.token) return next();
        throw keyNameClaimedErrorMsg;
      }
      return next();
    } else {
      const { key } = req.params;
      const data = await getExistingKey(key);

      if (data) {
        if (api_key == data.token) return next();
        throw keyNameClaimedErrorMsg;
      }
      return next();
    }
  } catch (error) {
    const { code = 500, message } = error;
    res.status(code).json({ warning: message });
  }
};

export { getExistingKey, validateUserToken, userKeyGuard };
