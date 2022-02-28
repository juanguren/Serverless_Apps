import {
  data,
  params,
  events,
  Request,
  Response,
} from '@serverless/cloud';
import mail from '@sendgrid/mail';
import { throwError } from '../helpers/error.helper';

const { SENDGRID_KEY } = params;

// SENDGRID_KEY=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

export const handleEmailOperations = async (
  req: Request,
  res: Response,
) => {
  try {
    if (SENDGRID_KEY) {
      mail.setApiKey(SENDGRID_KEY);
    } else {
      throwError(req, res, { message: 'No sendgrid key', code: 404 });
    }
    const emailContent = req.body;
  } catch (error) {}
};
