// const webpackConfigDev = require('./webpack.dev.conf');
// const webpackConfigDevDll = require('./webpack.dll.conf');
// const webpackConfigProd = require('./webpack.prod.conf');

if (process.env.NODE_ENV === 'development') {
    module.exports = require('./webpack.dev.conf');
} else if (process.env.NODE_ENV === 'development:dll') {
    module.exports = require('./webpack.dll.conf');
} else if (process.env.NODE_ENV === 'production') {
    module.exports = require('./webpack.prod.conf');
}
