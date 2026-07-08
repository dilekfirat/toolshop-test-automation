import { winstonLogger } from './winstonLogger';

export class Logger {
  static info(message: string): void {
    winstonLogger.info(message);
  }

  static warn(message: string): void {
    winstonLogger.warn(message);
  }

  static error(message: string): void {
    winstonLogger.error(message);
  }

  static debug(message: string): void {
    winstonLogger.debug(message);
  }
}