const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: {
        app: './src/js/root.js',
        vendor: ['react']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },
    resolve:{
        alias:{'@ant-design/icons/lib/dist$': path.resolve(__dirname, 'src/helper/antdIcon.js')}
    },
    devServer: {
        historyApiFallback: true,
    },
    devtool: 'source-map',
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
                        // },
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
    optimization: {
        splitChunks: {
            chunks: 'all',
            maxAsyncRequests: 5, //按需加载的最大模块数，vender~app.js这类文件
            maxInitialRequests: 3
        },
        runtimeChunk: {
            name: 'runtime'
        }
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 400000,
        maxAssetSize: 900000
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Headlines',
        template: './src/index.html',
        loading: './src/images/loading.gif',
        filename: 'index.html'
    }), new AntdDayjsWebpackPlugin()]

}