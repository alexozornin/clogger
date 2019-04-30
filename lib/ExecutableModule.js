'use strict'

const EventEmitter = require('events');
const child = require('child_process');
const readline = require('readline');

class ExecutableModule extends EventEmitter {
    constructor(filePath, args) {
        super();
        this.filePath = filePath;
        this.args = args;
        this.init();
    }

    init() {
        if (this.exe) {
            this.exe.removeAllListeners('error');
            this.exe.removeAllListeners('exit');
        }
        if (this.rlStdout) {
            this.rlStdout.removeAllListeners('line');
        }
        if (this.rlStderr) {
            this.rlStderr.removeAllListeners('line');
        }
        this.exe = child.spawn(this.filePath, this.args);
        this.exe.stdout.setEncoding('utf8');
        this.exe.stderr.setEncoding('utf8');
        this.exe.once('error', (err) => {
            this.emit('error', err);
            this.exit();
            this.init();
        });
        this.exe.once('exit', (code, signal) => {
            this.emit('exit', { code: code, signal: signal });
            this.init();
        });
        this.rlStdout = readline.createInterface({
            input: this.exe.stdout
        });
        this.rlStderr = readline.createInterface({
            input: this.exe.stderr
        });
        this.rlStdout.on('line', (line) => {
            this.emit('stdout', line);
        })
        this.rlStderr.on('line', (line) => {
            this.emit('stderr', line);
        })
    }

    write(str) {
        this.exe.stdin.write(str);
    }

    writeline(str) {
        this.exe.stdin.write(str + '\n');
    }

    exit() {
        this.exe.removeAllListeners('error');
        this.exe.removeAllListeners('exit');
        this.exe.kill('SIGTERM');
    }
}

module.exports = ExecutableModule;
