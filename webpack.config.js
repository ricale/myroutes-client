const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './'),
  entry: {
    index: './src/index.jsx'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  devServer: {
  },
  devtool: "cheap-eval-source-map",
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      actions:    path.resolve(__dirname, './src/actions'),
      components: path.resolve(__dirname, './src/components'),
      reducers:   path.resolve(__dirname, './src/reducers'),
      utils:      path.resolve(__dirname, './src/utils'),
      views:      path.resolve(__dirname, './src/views')
    }
  },
  plugins: [
    new ProgressBarPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader',
          options: {presets: ['react', 'es2015', 'stage-0']}
        }],
        exclude: /node_moduels/
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
        exclude: /node_moduels/
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_moduels/
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[hash].[ext]",
        exclude: /node_moduels/
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[hash].[ext]",
        exclude: /node_moduels/
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[hash].[ext]",
        exclude: /node_moduels/
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[hash].[ext]",
        exclude: /node_moduels/
      },
    ]
  }
}
