const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
mode: 'development',
entry: './src/js/app.js',
devServer: {
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    allowedHosts: 'all',
    hot: true,
    port: 3334,
    open: true,
    proxy: {
        '/api': {
          target: 'http://localhost:3333',
          pathRewrite: { '^/api': '' },
        },
      },
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            },
            },
            {
            test: /\.hbs?$/,
            exclude: /node_modules/,
            loader: 'handlebars-template-loader',
            },
            {
            test: /\.scss|css$/,
            use: [
                'style-loader',
                'css-loader',
                {
                loader: 'sass-loader',
                },
            ],
            },
        ]
    },
    plugins: [
    new HtmlWebPackPlugin({
        template: './src/index.hbs',
        filename: './index.html',
        hash: true,
        inject: 'head',
    }),
    ],
}