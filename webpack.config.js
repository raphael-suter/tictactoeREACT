let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: __dirname + '/build',
        filename: 'script-bundle.js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx$/,
                use: [
                    'babel-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './static/index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: './static',
            }
        ])
    ]
};
