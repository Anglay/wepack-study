let path = require("path")
let HtmlWebpackPlugin = require("html-webpack-plugin")

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
        open:true,
        compress:true,
        contentBase:"./dist"
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
        })
    ]
}