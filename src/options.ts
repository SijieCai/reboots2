import { BuildOptions } from './create-webpack-config';
var argv = require('minimist')(process.argv.slice(2));
var { NODE_ENV = 'development', APP_ENV = 'development', devtool, uglify, autoUpdate = false } = argv;

const supportedEnvs = ['development', 'test', 'beta', 'production'];
const supportedNodeEnvs = ['development', 'production'];
if (!supportedEnvs.includes(APP_ENV)) {
  throw new Error('APP_ENV must be one of the following values: ' + supportedEnvs.join(', '));
}
if (!supportedNodeEnvs.includes(NODE_ENV)) {
  throw new Error('NODE_ENV must be one of the following values: ' + supportedNodeEnvs.join(', '));
}

process.env.NODE_ENV = NODE_ENV;

if (uglify === undefined) {
  uglify = NODE_ENV === 'production';
}
if (devtool === undefined) {
  devtool = (APP_ENV === 'production' ?  '': '');
}

const options: BuildOptions = { NODE_ENV, APP_ENV, devtool, uglify, autoUpdate };
export default options;
