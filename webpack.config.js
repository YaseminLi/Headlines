// const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const loading=require('./src/images/loading.gif')
module.exports = {
    mode: 'production',
    entry: {app:'./src/js/root.js',
            vendor:['react']},
    output: {
        path: __dirname,
        filename: '[name].js',
        // publicPath: '/'
    },
    devtool:'source-map',
    devServer: {
        historyApiFallback: true,
        // publicPath: '/'
    },
    // performance: {
    //     hints: 'warning',
    //     maxEntrypointSize: 400000,
    //     maxAssetSize: 100000
    //   },
      optimization:{
          splitChunks:{
            cacheGroups: {
                commons: {
                  name: 'vendor',
                  chunks: 'initial',
                  minChunks: 2
                }
              }
          }
      },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",//babel-loader将其他文件解析为js文件
                options: {
                    presets: ['@babel/preset-env', "@babel/preset-react"], //babel-loader需要的预设
                    plugins: [
                        ["import", {
                            libraryName: "antd",
                            libraryDirectory: "es",
                            style: "css" // `style: true` 会加载 less 文件
                        }]
                    ]
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        // options: {
                        //     importLoaders: 1,
                        //     modules: true,
                        //     localIdentName: '[path][name]__[local]--[hash:base64:5]',
                        //},
                    }
                ],
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'less-loader' // compiles Less to CSS
                }]
            }

        ]
    },
    plugins: [new HtmlWebpackPlugin({
        title:'Headlines',
        template:'./src/index.html',
        loading:'./src/images/loading.gif'
    })]

}