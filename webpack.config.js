const webpack = require('webpack');
const dotenv = require('dotenv')

module.exports = {
    entry: './admin-app/index.js',
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: './dist',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(sass|less|css|scss)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            'API_KEY': dotenv.config().parsed['SHOPIFY_API_KEY'],
            'APP_URL': dotenv.config().parsed['APP_URL']
        })
    ]
};