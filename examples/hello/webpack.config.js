

const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry : './src/index.js',
    output: {
        path: path.resolve(__dirname , 'dist') ,
        filename:'app.[hash:5].js'
    },

    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },

    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    }  ,

    devServer:{
        contentBase: path.join(__dirname , 'dist'),
        compress:true ,
        hot:true ,
        inline:true,
        open:true,
        port:9090
    }

}