import winston from 'winston';
import path from 'path';

// Worker ID provided by Playwright
const workerId = process.env.TEST_WORKER_INDEX ?? '0';

// Timestamp for this logger instance
const timestamp = new Date()
    .toISOString()
    .replace(/[-:]/g, '')
    .replace('T', '_')
    .split('.')[0];

let logger: winston.Logger | undefined;

export function getLogger(): winston.Logger {

    if (!logger) {

        logger = winston.createLogger({

            level: process.env.LOG_LEVEL ?? 'info',

            format: winston.format.combine(

                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),

                winston.format.printf(({ timestamp, level, message }) =>
                    `[${timestamp}] [Worker ${workerId}] ${level.toUpperCase()}: ${message}`
                )

            ),

            transports: [

                new winston.transports.Console(),

                new winston.transports.File({

                    filename: path.join(
                        'logs',
                        `${timestamp}_worker_${workerId}.log`
                    ),

                    handleExceptions: true

                })

            ]

        });

    }

    return logger;
}