import { Request, Response } from '@serverless/cloud';
import { IHttpError } from './types';

const throwError = (_req: Request, res: Response, exception: any) => {
  const { error } = exception;
  const { errorContent, message, code = 500 } = error;

  return res.status(code).json({ message, error: errorContent });
};

export { throwError };
