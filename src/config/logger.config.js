const winston = require('winston');
const { LOG_DB_URL } = require('./server.config');
const { stack } = require('../routers');
require('winston-mongodb');
const allowedTransports = [];
allowedTransports.push(
	new winston.transports.Console({
		format: winston.format.combine(
			winston.format.colorize(),
			winston.format.timestamp({
				format: `YYYY-MM-DD HH:mm:ss`,
			}),
			// Second argument to the combine method,which defines what is exactly going to printed in log
			winston.format.printf(
				(info) => `${info.timestamp} [${info.level}]: ${info.message}`,
			),
		),
	}),
);
allowedTransports.push(
	new winston.transports.MongoDB({
		level: 'error',
		db: LOG_DB_URL,
		collection: 'logs',
	}),
);
allowedTransports.push(
	new winston.transports.File({
		filename: `app.log`,
	}),
);
const logger = winston.createLogger({
	format: winston.format.combine(
		// First argument to the combine method is defining
		winston.format.errors({ stack: true }),
		winston.format.timestamp({
			format: `YYYY-MM-DD HH:mm:ss`,
		}),
		// Second argument to the combine method,which defines what is exactly going to printed in log
		winston.format.printf(
			(info) =>
				`${info.timestamp} [${info.level.toUpperCase()}]: ${info.message} `,
		),
	),
	transports: allowedTransports,
});
module.exports = logger;
