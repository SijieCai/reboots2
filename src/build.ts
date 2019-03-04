
import webpack, { Configuration } from 'webpack';
import { AnyCnameRecord } from 'dns';
const path = require('path');
const appRootDir = require('app-root-dir').get();
const rimraf = require('rimraf');

// 删除上次编译结果
export default function (config: Configuration) {
  rimraf('{public/client,dist,public/__version__,public/nginx}', {}, (e: any) => {
    if (e) return console.log(e);


    function report(err: any, stats: any) {
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


      // 生成nginx
      // const fs = require('fs');

      // fs.mkdirSync(join('public/nginx'));
      // const data = fs.readFileSync(join('internal/nginx.config.template')).toString();

      // ['dev.', 'dev1.', 'dev2.', 'dev3.', 'beta.', 'beta1.', 'beta2.', ''].forEach(name => {
      //   let fileContent = data.replace(/<replace_domain>/g, `${name}hulk.corp.qihoo.net`);
      //   fs.writeFileSync(join(`public/nginx/${name}hulk.corp.qihoo.net.conf`), fileContent);
      // })
    }

    webpack(config, report);
  })
}
