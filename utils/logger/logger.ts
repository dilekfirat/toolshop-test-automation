import { getLogger } from './winstonLogger';

export class Logger {

    static info(message: string): void {
        getLogger().info(message);
    }

    static warn(message: string): void {
        getLogger().warn(message);
    }

    static error(message: string): void {
        getLogger().error(message);
    }

    static debug(message: string): void {
        getLogger().debug(message);
    }

}