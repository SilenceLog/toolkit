const path = require('path');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    queue: './src/common/Queue.js',
    prototype: './src/common/prototype/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/common')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      }
    ]
  }
};