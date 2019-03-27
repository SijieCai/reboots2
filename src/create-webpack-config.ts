
import * as webpack from 'webpack';
import { Configuration, Options } from 'webpack';
import 'webpack-dev-server';
const appRootDir = require('app-root-dir').get();
import * as path from 'path';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CreateFileWebpack = require('create-file-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const defaultTemplatePath = path.join(appRootDir, 'src/template.html');
const CopyPlugin = require('copy-webpack-plugin');

export interface Entry {
  name: string;
  title: string;
  icon?: string;
  splitChunks?: string[];
  templatePath?: string;
  appendToHead?: string;
  appendToBody?: string;
}

export interface BuildOptions {
  APP_ENV: string;
  NODE_ENV: string;
  uglify: boolean;
  autoUpdate: boolean;
  devtool?: Options.Devtool;
  [key: string]: any;
}

function toApp(relativePath?: string) {
  return path.resolve(appRootDir, 'src/', relativePath);
}

export default (opt: { options: BuildOptions, entries: Entry[] }): Configuration => {
  const { options, entries } = opt;
  const { devtool, APP_ENV, uglify } = options;
  console.log('运行配置：\n' + Object.keys(options).map((key) => `${key}: ${options[key]}`).join('\n'));
  const { NODE_ENV, autoUpdate } = options;
  const isDev = NODE_ENV === 'development' || NODE_ENV === 'test';
  let versionScript = '';
  const timestampVersion = Date.now().valueOf();
  if (autoUpdate) {
    versionScript = `<script>window.__version__ = "${timestampVersion}";</script>`;
  }

  const htmlEntries = entries.map((v) => {
    return new HtmlWebpackPlugin({
      template: v.templatePath || defaultTemplatePath,
      filename: v.name + '.html',
      versionScript,
      icon: v.icon,
      chunks: [...(v.splitChunks || []), v.name],
      appendToHead: v.appendToHead,
      appendToBody: v.appendToBody
    });
  });
  function cssLoaders(loader?: any) {
    const use = [
      'style-loader',
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: () => [
            require('autoprefixer')(
              {
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
              }
            )
          ]
        }
      }
    ];
    if (loader) {
      use.push(...loader);
    }
    return use;
  }
  return ({
    mode: isDev ? 'development' : 'production',
    entry: entries.reduce((obj, entry) => {
      obj[entry.name] = toApp(entry.name);
      return obj;
    }, {} as { [index: string]: string }),
    output: {
      path: path.resolve(appRootDir, 'dist'),
      filename: 'app/[name].[hash:8].js',
      chunkFilename: 'app/[name].[hash:8].chunk.js',
      publicPath: '/'
    },
    target: 'web',
    devServer: {
      host: '127.0.0.1',
      port: 8360,
      disableHostCheck: true,
      contentBase: [path.join(appRootDir, 'public'), path.join(appRootDir, 'dist')],
      overlay: {
        errors: true
      },
      inline: true,
      historyApiFallback: {
        rewrites: entries.map((entry) => (
          { from: new RegExp(`^\/${entry.name}`), to: `/${entry.name}.html` }
        ))
      },
      index: `/${entries[0].name}.html`,
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts"],
      alias: entries.reduce((alias, entry) => {
        alias[entry.name] = toApp(entry.name);
        return alias;
      }, {
        common: toApp('common')
      } as { [index: string]: string }),
      mainFields: ["browser", "main"],
      modules: ["node_modules"]
    },
    module: {
      rules: [
        // .js .jsx
        {
          test: /\.jsx?$/, use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: [
                  '@babel/preset-react',
                  ['@babel/preset-env', isDev ? {
                    loose: true,
                    modules: 'false',
                    useBuiltIns: "entry",
                    targets: {
                      esmodules: true
                    }
                  } : { modules: 'false' }]
                ],
                // cacheDirqectory: true,
                plugins: [
                  ['@babel/plugin-proposal-decorators', { legacy: true }],
                  ['@babel/plugin-proposal-class-properties', { loose: true }]
                ]
              }
            }
          ].filter((i) => i),
          include: [path.resolve(appRootDir, 'src')]
        },
        { test: /\.txt$/, use: 'raw-loader' },
        { test: /\.css$/, use: cssLoaders(), },
        { test: /\.less$/, use: cssLoaders([{ loader: "less-loader" }]) },
        {
          test: /\.scss$/, loader: cssLoaders([{
            loader: "sass-loader", options: {
              ncludePaths: [toApp('user/components/theme'), toApp('admin/components/theme')]
            }
          }])
        },
        {
          test: /\.(png|jpg|gif|ttf|eot|svg|woff|woff2)$/,
          loader: 'url-loader',
          options: {
            name: '[path][name].[ext]&limit=200000'
          }
        }
      ]
    },
    devtool,
    plugins: [
      ...htmlEntries,
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
      !isDev && new CopyPlugin([
        {
          from: path.join(appRootDir, 'public/'),
          to: path.join(appRootDir, 'dist/')
        },
      ]),
      isDev && new webpack.NoEmitOnErrorsPlugin(),
      isDev && new webpack.NamedModulesPlugin(),
      !isDev && new webpack.HashedModuleIdsPlugin(),
      autoUpdate && new CreateFileWebpack({
        path: path.resolve(appRootDir, 'dist'),
        fileName: '__version__',
        content: timestampVersion
      }),
      new webpack.ProvidePlugin({
        React: 'react'
      }),
      new ProgressBarPlugin(),
      new webpack.DefinePlugin({
        'process.env.APP_ENV': JSON.stringify(APP_ENV),
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
      }),
      uglify && new UglifyJsPlugin({ exclude: /\.min\.js$/ }),
    ].filter((i) => i)
  });
};
