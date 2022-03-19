import winston = require('winston');

const ERROR_LOG_FILE_LOCATION =
  process.env.ERROR_LOG_FILE_LOCATION || './logs/error.log';
const LOG_FILE_LOCATION = process.env.LOG_FILE_LOCATION || './logs/log.log';

const { combine, splat, timestamp, printf, colorize } = winston.format;

const FORMAT = printf(({ level, message, timestamp }) => {
  const msg = `${timestamp} [${level}] : ${message} `;
  return msg;
});
const LOGGER = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), splat(), FORMAT),

  transports: [
    new winston.transports.File({
      filename: ERROR_LOG_FILE_LOCATION,
      level: 'error',
    }),
    new winston.transports.File({ filename: LOG_FILE_LOCATION }),
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

// if (process.env.NODE_ENV !== 'production') {
//   LOGGER.add(new winston.transports.Console({
//     format: winston.format.simple(),
//   }));
// }

export default LOGGER;
