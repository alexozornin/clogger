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

switch (script) {
    case 'gcc':
        console.log(`Building for platform ${platform}...`);
        child.spawn(path.join(__dirname, 'gccbuild.bat'));
        break;
    case 'vc':
        console.log(`Building for platform ${platform}...`);
        child.spawn(path.join(__dirname, 'vcbuild.bat'));
        break;
    default:
        console.log(`Platform ${platform} is not supported`);
        break;
}
