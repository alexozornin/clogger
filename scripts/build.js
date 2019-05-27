'use strict'

const os = require('os');
const path = require('path');
const child = require('child_process');

const scripts = {
    darwin: 'gcc',
    freebsd: 'gcc',
    linux: 'gcc',
    openbsd: 'gcc',
    win32: 'vc'
}

const platform = os.platform();

const script = scripts[platform];

try {
    switch (script) {
        case 'gcc':
            console.log(`Building for platform ${platform}...`);
            child.spawn(path.join(__dirname, 'gccbuild.sh'));
            break;
        case 'vc':
            console.log(`Building for platform ${platform}...`);
            child.spawn(path.join(__dirname, 'vcbuild.bat'));
            break;
        default:
            console.log(`Platform ${platform} is not supported`);
            break;
    }
}
catch (err) {
    console.log('Cannot build clogger. You might be able to build manually.');
    console.log(err);
}
