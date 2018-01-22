const path = require('path');
const webpack = require('webpack')

module.exports = {
  entry: {
   common: './src/common/index.js',
   util: './src/util/index.js'
  },
  output: {
   filename: 'toolkit.js',
   filename: '[name].toolkit.js',
    path: path.resolve(__dirname, 'dist')
  }
};