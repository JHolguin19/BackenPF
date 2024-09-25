import winston from 'winston';
import 'winston-mongodb';

const logConfigDev = {

    level: 'info',
    transports: [ 
        new winston.transports.Console({ level: 'debug' }),
    ]
};

const logConfigProd = {

    level: 'info',
    transports: [ 
        new winston.transports.Console({ }),
    ]
};

const logConfig = process.env.ENV === 'dev' ? logConfigDev : logConfigProd

export const logger = winston.createLogger(logConfig)