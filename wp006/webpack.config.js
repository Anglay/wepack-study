let path = require("path")
let webpack = require("webpack")
let HtmlWebpackPlugin = require("html-webpack-plugin")
let MiniCssExtractPlugin = require("mini-css-extract-plugin")
let OptimizeCss = require("optimize-css-assets-webpack-plugin")
let UglifyjsPlugin = require("uglifyjs-webpack-plugin")

module.exports = {
    mode:"development",//development || production
    entry:"./src/index.js",
    output:{
        filename:"bundle.[hash:8].js",
        path:path.resolve(__dirname,"dist")
    },
    devServer:{
        port :3000,
        progress:true,
        open:false,
        compress:true,
        contentBase:"./dist"
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                //loader的顺序是从右向左执行
                use:[MiniCssExtractPlugin.loader,'css-loader','postcss-loader']
            },
            {
                test:/\.less$/,
                use:[MiniCssExtractPlugin.loader,'css-loader','postcss-loader','less-loader']
            },
            {
                test:/\.js$/,
                use:[{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            '@babel/preset-env'
                        ],
                        plugins:[
                            ['@babel/plugin-proposal-decorators',{"legacy":true}],
                            ['@babel/plugin-proposal-class-properties',{"loose":true}]
                        ]
                    }
                }]
            }
        ]
    },
    optimization:{
        minimizer:[
            new OptimizeCss(),
            new UglifyjsPlugin({
                cache:true,
                parallel: true,
                sourceMap:true
            })
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            minify:{
                removeAttributeQuotes:true,
                collapseWhitespace:true
            },
            hash:true
        }),
        new MiniCssExtractPlugin({
            filename:"main.css"
        }),
        new webpack.ProvidePlugin({
            $:"jquery"
        })
    ]
}