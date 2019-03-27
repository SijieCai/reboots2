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

const { port, host } = devServerOptions;
server.listen(port, host, () => {
  console.log(`Starting server on http://${host}:${port}`);
});