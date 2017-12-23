# webpack-demo 说明


```
index.js              # 入口文件，通过 NODE_ENV 载入另外的 webpack 配置文件
webpack.dll.conf.js   # 生成 dll 的配置
webpack.base.conf.js  # 公用 webpack 配置
webpack.dev.conf.js   # 开发时配置，继承自 base
webpack.prod.conf.js  # 生产时配置，继承自 base
```
