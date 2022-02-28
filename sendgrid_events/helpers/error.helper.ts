import { Request, Response } from '@serverless/cloud';

interface IHttpError {
  error?: Error;
  message: string;
  code: number;
}

const throwError = (
  req: Request,
  res: Response,
  exception: IHttpError,
) => {
  const { error, message, code } = exception;
  return res.status(code).json({ message, error });
};

export { throwError };
