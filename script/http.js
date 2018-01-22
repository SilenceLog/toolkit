const path = require('path');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: './src/util/http.js',
  output: {
    filename: 'http.js',
    path: path.resolve(__dirname, '../dist')
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