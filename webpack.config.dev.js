const webpack = require('webpack');
const config = require('./webpack.config.common.js');

config.output = {
  filename: '[name].js',
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/dist/'
};

module.exports = config;
