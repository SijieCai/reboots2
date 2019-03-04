import { Configuration } from 'webpack';
import _build from './build';
import options from './options';
import { createWebpackConfig, BuildOptions, Entry } from './create-webpack-config';

export function createConfig (cb: (options: BuildOptions) => Entry[]): Configuration {
  const entries = cb(options);
  return createWebpackConfig({ options, entries });
}
 
export const build = _build;
