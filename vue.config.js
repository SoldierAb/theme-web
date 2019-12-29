const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const sourceResolve = theme => path.resolve(__dirname, `./src/theme/${theme}.scss`)

module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  publicPath: '/',

  // where to output built files
  outputDir: 'dist',

  // whether to use eslint-loader for lint on save.
  // valid values: true | false | 'error'
  // when set to 'error', lint errors will cause compilation to fail.
  lintOnSave: true,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: (config) => {
    config
      .output
      .filename(`js/[name].[hash:6].js`).end()
  },

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(sa|sc)ss$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              "css-loader",
              "sass-loader",
              {
                loader: 'sass-resources-loader',
                options: {
                  resources:[sourceResolve('common'),sourceResolve(process.env.npm_config_theme)]  //主题皮肤文件全局注入
                }
              }
            ]
          })
        },
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          default: false,
          vendors: false,
          // Merge all the SCSS into one file
          styles: {
            name: 'styles',
            test: /\.(sa|sc)ss$/,
            chunks: 'all',
            minChunks: 1,
            minSize:0,
            enforce: true,
          },
        },
      },
    },
    plugins: [
      new ExtractTextPlugin({
        filename: `theme/${process.env.npm_config_theme}.css`,
        allChunks: true      //!!!针对所有模块进行抽取。需要设置为true
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@c': path.resolve(__dirname, './src/components'),
        '@v': path.resolve(__dirname, './src/views'),
        '@u': path.resolve(__dirname, './src/utils'),
        '@a': path.resolve(__dirname, './src/api'),
      }
    },
  },


  filenameHashing: false,

  css: {
    extract: false,

    sourceMap: false,
  
  },

  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,

  // configure webpack-dev-server behavior
  devServer: {
    open: process.env.NODE_ENV === 'development',
    host: '0.0.0.0',
    port: 8090,
    https: false,
    hotOnly: true,
    proxy: {
      'api':{
        target:'http://192.168.120.60:8080',
        ws: true, // 是否启用websockets
        changOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRequiresRewrite: {
          "^api": "/"
        },
        // router:{
        //   'api/v1/districts':'http://192.168.120.60:8080',
        //   'api/v1/deliveries':'http://192.168.120.60:8080',
        //   'api/v1/outbounds':'http://192.168.120.60:8080',
        // }
      },
    
    },
    before: app => { },
    watchOptions: {
      poll: true,
      ignored: path.join(__dirname, '/node_modules')
    }
  },

}
