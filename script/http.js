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
      },
      {
        // 使所有以 .json5 结尾的文件使用 `json5-loader`
        test: /\.json5$/,
        loader: 'json5-loader',
        include: [resolve('src'), resolve('test')]
      }
    ]
  }
};