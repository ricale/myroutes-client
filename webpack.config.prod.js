const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config.common.js');

config.output = {
  filename: '[name].js',
  path: path.resolve(__dirname, 'dist'),
  publicPath: './dist/'
};

config.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  })
)

module.exports = config;
