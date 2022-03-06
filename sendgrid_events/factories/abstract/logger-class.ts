import { params } from '@serverless/cloud';

interface ILogger {
  info(message: string): void;
  warn?(message: string): void;
  debug?(message: string): void;
  error(message: string | object): void;
}

class ProductionLogger implements ILogger {
  info(message: string): void {
    console.log(message);
  }

  error(message: string | object): void {
    console.error(message);
  }
}

class DevLogger implements ILogger {
  info(message: string): void {
    console.log(message);
  }

  warn(message: string): void {
    console.warn(message);
  }

  debug(message: string): void {
    console.debug(message);
  }

  error(message: string | object): void {
    console.error(message);
  }
}

export class LoggerFactory {
  public static createLogger(): ILogger {
    if (params.APP_ENV === 'development') {
      return new DevLogger();
    }
    return new ProductionLogger();
  }
}
