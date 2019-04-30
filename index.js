'use strict'

const os = require('os');
const path = require('path');
const ExecutableModule = require('./lib/ExecutableModule.js');

var exePath = path.join(__dirname, 'bin', 'CLogger');
if (os.platform() == 'win32') {
    exePath += '.exe';
}

const loggers = {};

/**
 *
 * @param {String} name - Name of the logger
 * @param {String} filepath - Default path to the log file
 * @param {Number} hours - Hours to start a new log file
 * @param {Number} minutes - Hours to start a new log file
 */
function createNewLogger(name, filepath, hours, minutes) {
    if (!loggers[name]) {
        loggers[name] = new ExecutableModule(exePath, [name, filepath]);
        loggers[name].on('stdout', (line) => {
            console.log(line);
        });
        loggers[name].on('stderr', (line) => {
            console.log(line);
        });
    }
    else {
        throw new Error('Logger already exists');
    }
}
/**
 *
 * @param {*} name - Name of the logger
 */
function removeLogger(name) {
    if (loggers[name]) {
        loggers[name].exit();
        delete loggers[name];
    }
    else {
        throw new Error('No such logger');
    }
}

/**
 *
 * @param {String} name - Name of the logger
 * @param {*} message
 * @param {'info' | 'debug' | 'warn' | 'error' | 'critical'} type - Type of the message
 */
function log(name, message, type) {
    if (loggers[name]) {
        message = JSON.stringify(message);
        if (message[message.length - 1] != '\n') {
            message += os.EOL;
        }
        switch (type) {
            case 'debug':
                loggers[name].write('D: ' + message);
                break;
            case 'warn':
                loggers[name].write('W: ' + message);
                break;
            case 'error':
                loggers[name].write('E: ' + message);
                break;
            case 'critical':
                loggers[name].write('C: ' + message);
                break;
            default:
                loggers[name].write('I: ' + message);
                break;
        }
    }
    else {
        throw new Error('No such logger');
    }
}

module.exports = {
    createNewLogger,
    removeLogger,
    log
};
