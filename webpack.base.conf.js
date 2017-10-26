'use strict'
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// dll manifext 文件，由 webpack.dllPlugin 生成，极大极大的减少构建时间，由机械硬盘直达 SSD 的感觉
const manifest = require('./manifest');

const root = p => path.join(__dirname, '..', p);

module.exports = {
  context: root('./'),
  entry: {
    app: './src/index.js',
  },
  output: {
    path: root('dist'),
    publicPath: '/',
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': root('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [root('src')],
        options: {
          fix: true,
          formatter: require("eslint-friendly-formatter"),
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // extractCSS: true,
          transformToRequire: {
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          },
        },
      },
      {
        test: /\.js$/,
        include: [root('src')],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
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
            name: 'static/images/[name].[hash:10].[ext]',
          },
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 4096,
          name: 'static/media/[name].[hash:10].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 4096,
            name: 'static/fonts/[name].[hash:10].[ext]',
          }
        }
      },
    ],
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: root('./public'),
      manifest: manifest,
      name: 'vendor',
    }),
    // 感觉一样的啊这个插件，暂时保留。
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash:10].css',
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: true,
        removeScriptTypeAttributes: true,
        removeComments: true,
        sortAttributes: true,
        sortClassName: true,
      },
    }),
  ],
}
