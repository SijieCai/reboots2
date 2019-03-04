import { createConfig, build } from './src';

const config = createConfig(() => {
  return [
    {
      name: 'system',
      title: '管理端',
      splitChunks: ['common']
    },
    {
      name: 'client',
      title: '用户端',
      splitChunks: ['common']
    }
  ]

});
config.optimization = {
  splitChunks: {
    cacheGroups: {
      commons: {
        name: 'commons',
        priority: -10,
        reuseExistingChunk: true,
        chunks: 'initial',
        minChunks: 2
      }
    }
  }
}

build(config);