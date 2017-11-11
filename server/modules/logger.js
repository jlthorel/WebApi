var winston = require('winston');
const Rotate = require('winston-logrotate').Rotate;
var path = require('path');

const logDir = __dirname + '/log/';
const logFileName = 'appWebApi.log';

console.log('logdir = ' + logDir);

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new Rotate({
            file: '/DEV_DIR/projets/WebApi/log/webapi.log', // this path needs to be absolute
            colorize: false,
            timestamp: true,
            json: false,
            size: '100m',
            keep: 5,
            compress: true
        })
    ]
});



exports.logger = logger;