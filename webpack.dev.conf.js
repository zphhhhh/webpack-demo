const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');


module.exports = merge(baseWebpackConfig, {
  devServer: {
    contentBase: './public',
    hot: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    open: true,
    overlay: {
      errors: true,
      // warnings: true,
    },
    proxy: {
      "/api": {
        target: "https://easy-mock.com/mock/59e319aff88b6c379835c41c/mi/",   // Mock API 服务器
        // target: "http://10.108.16.122:8080",  // 杨研的服务器
        pathRewrite: {
          // "^/api": "",
        },
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
  ],
})
