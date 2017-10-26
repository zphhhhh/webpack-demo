const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const root = p => path.join(__dirname, '..', p);

module.exports = merge(baseWebpackConfig, {
  output: {
    path: root('../src/main/webapp/'),
    filename: 'static/js/[name].[chunkhash:10].js',
    chunkFilename: 'static/js/[name].[chunkhash:10].js',
  },
  plugins: [
    new CleanWebpackPlugin([root('../src/main/webapp/')], {
      root: root('../'),
      exclude: ['WEB-INF'],
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'static/js/vendor.[hash:10].js',
      minChunks: function (module) {
        // 通过 npm 安装的 lib 全都打包进 vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        );
      },
    }),
    // // extract webpack runtime and module manifest to its own file in order to
    // // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
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
    new CopyWebpackPlugin([{
      from: root('public'),
      ignore: ['index.html'],
    }])
  ]
})
