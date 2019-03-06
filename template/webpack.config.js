
const { createWebpackConfig } = require('reboots2');

const config = createWebpackConfig(() => {
  return [
    {
      name: 'entry1',
      title: 'Entry1',
      splitChunks: ['commons']
    },
    {
      name: 'entry2',
      title: 'Entry2',
      splitChunks: ['commons']
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

module.exports = config;