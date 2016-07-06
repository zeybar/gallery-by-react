'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/index'),
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    // 用来检测相似的文件中重复的内容，然后将冗余在output中消除掉
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    // 压缩输出的JavaScript代码
    new webpack.optimize.UglifyJsPlugin(),
    // 按照引用频度来排序各个模块，引用的越频繁其id值越短，以便达到减小文件大小的效果
    new webpack.optimize.OccurenceOrderPlugin(),
    // 用来优化生成的代码，合并相似的
    new webpack.optimize.AggressiveMergingPlugin(),
    // 使代码不出错
    new webpack.NoErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
