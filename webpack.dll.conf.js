'use strict'
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const root = p => path.join(__dirname, '..', p);

module.exports = {
  context: root('./'),
  entry: {
    'vendor': [
      'bootstrap/dist/css/bootstrap.min.css',
      'reset-css',
      'babel-polyfill',
      'vue',
      'vue-router',
    ],
  },
  output: {
    // path: root('../src/main/webapp/'),
    path: root('./public/'),
    publicPath: '/',
    filename: 'static/js/[name]-manifest.[hash:10].js',
    library: '[name]',
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 4096,
            name: 'static/images/[name]-manifest.[hash:10].[ext]',
          },
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 4096,
          name: 'static/media/[name]-manifest.[hash:10].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 4096,
            name: 'static/fonts/[name]-manifest.[hash:10].[ext]',
          }
        }
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([root('./public')], {
      root: root('./'),
    }),
    new webpack.DllPlugin({
      context: root('./public'),
      path: root('./config/manifest.json'),
      name: '[name]',
    }),
    new ExtractTextPlugin({
      filename: 'static/css/[name]-manifest.[contenthash:10].css',
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
        map: { inline: false },
      },
    }),
    new webpack.HashedModuleIdsPlugin(),
    new UglifyJsPlugin({
      parallel: true,
      sourceMap: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      // minify: {
      //   collapseInlineTagWhitespace: true,
      //   collapseWhitespace: true,
      //   minifyCSS: true,
      //   minifyJS: true,
      //   removeAttributeQuotes: true,
      //   removeScriptTypeAttributes: true,
      //   removeComments: true,
      //   sortAttributes: true,
      //   sortClassName: true,
      // },
    }),
  ],
}
