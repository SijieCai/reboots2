import * as fs from 'fs';
const path = require('path');
const appRoot = require('app-root-dir').get();

if (!fs.existsSync(path.join(appRoot, 'webpack.config.js'))) {
  require('./init');
} else {
  console.log('webpack.config.js already exists, stop init action.');
  console.log();
  console.log("You can manually call init by call `node ./node_modules/bin/reboots init`");
}