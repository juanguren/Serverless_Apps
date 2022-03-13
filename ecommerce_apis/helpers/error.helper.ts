import { Request, Response } from '@serverless/cloud';
import { IHttpError } from './types';

const throwError = (
  _req: Request,
  res: Response,
  exception: IHttpError,
) => {
  const { error } = exception;
  const { errorContent, message, code } = error;

  return res.status(code).json({ message, error: errorContent });
};

export { throwError };
