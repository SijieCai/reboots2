import { Configuration } from 'webpack';
import options from './options';
import { createWebpackConfig, BuildOptions, Entry } from './create-webpack-config';

export function createConfig (cb: (options: BuildOptions) => Entry[]): Configuration {
  const entries = cb(options);
  return createWebpackConfig({ options, entries });
}