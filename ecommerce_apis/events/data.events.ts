import { data } from '@serverless/cloud';
import { LoggerFactory } from '../factories/abstract-logger/logger-class';
import { sendEmail } from '../services/sendgrid.service';

const logger = LoggerFactory.createLogger();
interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  id?: string;
}

export class UserManager {
  public async create(user: IUser) {
    const { username } = user;

    const existingRecord = await this.userExists(username);
    if (existingRecord) return existingRecord;

    return await data.set(`${username}`, {
      ...user,
      createdAt: new Date().toISOString(),
    });
  }

  private async userExists(username: string) {
    const response = await data.get(username);

    return response;
  }
}

data.on('created', async (event) => {
  const { value: user } = event.item;
  const { email: userEmail } = user;
  try {
    const emailOperation = await sendEmail(userEmail);

    logger.info(
      `${emailOperation.response} Email sent to ${emailOperation.recipient}`,
    );
  } catch (error) {
    logger.error({ error });
  }
});
