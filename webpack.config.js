const path = require('path');

// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');

// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 入口文件
    entry: "./src/index.ts",

    // 指定打包文件所在目录
    output: {
        // 打包文件目录
        path: path.resolve(__dirname, "dist"),
        // 打包文件名
        filename: "bundle.js",
        // 设置是否使用箭头函数
        environment: {
            arrowFunction: false
        }
    },

    // 设置mode模式， development：开发环境，production：生产环境
    mode: "production",

    // 指定打包的模块
    module: {
        // 指定加载规则
        rules: [
            {
                // 指定规则生效的文件
                test: /\.ts$/,
                use: [
                    // 配置babel
                    {
                        // 指定加载器
                        loader: "babel-loader",
                        // 设置babel
                        options: {
                            // 设置预定义环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 需要兼容的目标浏览器
                                        targets: {
                                            "chrome": "88",
                                            "ie": "11"
                                        },
                                        "corejs": "3",
                                        // 使用corejs的方式，按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },

                    "ts-loader"
                ],
                // 要排除的文件
                exclude: /node_modules/
            }
        ]
    },

    // 配置插件
    plugins: [
        new CleanWebpackPlugin(),

        new HTMLWebpackPlugin({
            template: "./src/index.html"
        }),
    ],

    // 设置引入模块
    resolve: {
        extensions: [".ts", ".js"]
    }
}