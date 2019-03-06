
import { Configuration } from 'webpack';
const appRootDir = require('app-root-dir').get();
const path = require('path');
const config: Configuration = require(path.join(appRootDir, 'webpack.config.js'));
module.exports = config;