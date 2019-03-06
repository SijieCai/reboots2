import { Configuration } from 'webpack';
import options from './options';
import createConfig, { BuildOptions, Entry } from './create-webpack-config';

export function createWebpackConfig(cb: (options: BuildOptions) => Entry[]): Configuration {
  const entries = cb(options);
  return createConfig({ options, entries });
}