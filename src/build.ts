
const webpack = require('webpack');
import { Configuration, Stats } from 'webpack';
import * as path from 'path';
const appRootDir = require('app-root-dir').get();
const rimraf = require('rimraf');

const config: Configuration = require(path.join(appRootDir, 'webpack.config.js'));

// 删除上次编译结果
function build(config: Configuration) {
  rimraf('{dist}', {}, (e: any) => {
    if (e) return console.log(e);


    function report(err: Error, stats: Stats): void {
      if (err) {
        return console.error(err);
      }
      console.log(stats.toString({
        colors: true,
        cached: false,
        children: true,
        chunkModules: false,
        chunkOrigins: false,
        modules: false,
        timings: true,
      }));

      function join(p: string) {
        return path.join(appRootDir, p);
      }
    }

    webpack(config, report);
  })
}
build(config);
