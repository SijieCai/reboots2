const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack-config');

const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  stats: {
    colors: true,
  },
});
delete webpackConfig.devServer;
const compiler = Webpack(webpackConfig);

const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(devServerOptions.port, devServerOptions.host, () => {
  console.log('Starting server on http://localhost:8080');
});