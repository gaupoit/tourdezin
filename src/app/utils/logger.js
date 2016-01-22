const winston = require('winston');
require('winston-loggly');
const path    = require('path');
const config  = require('../config/app.json');

winston.emitErrs = true;

var transports = [];

transports.push(new winston.transports.File({
	level: 'error',
	handleExceptions: true,
    json: true,
    colorize: false,
    name: 'file',
    rotationFormat: true,
    filename: config.log_path
}));

transports.push(new winston.transports.Console({
	level: 'debug',
	handleExceptions: true,
    json: false,
    colorize: true,
}));

transports.push(new winston.transports.Loggly(
	config.loggy_config
));


var logger = new winston.Logger({
	transports: transports,
	exitOnError: false
});

module.exports = logger;
module.exports.stream = {
	write: function(message, encoding) {
		logger.info(message);
	}
}