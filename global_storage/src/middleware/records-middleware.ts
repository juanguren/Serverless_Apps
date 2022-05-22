import { Request, Response, data } from '@serverless/cloud';

export const validateRecordExists = async (
  req: Request,
  res: Response,
  next: CallableFunction,
) => {
  const { key } = req.params;
  try {
    const response = await data.get(key);
    if (response) return next();

    throw {
      message: `Record does not exist`,
      code: 404,
    };
  } catch (error) {
    const { message, code } = error;
    return res.status(code || 500).json({ message });
  }
};
