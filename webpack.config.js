var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080',//资源服务器地址
        'webpack/hot/only-dev-server',
        './app/index.jsx'
    ],
    output: {
        publicPath: "http://127.0.0.1:8080/static/dist/",
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    devServer: {
        hot: true,
        inline: true,
        proxy: {
            '/api/*': {
                target: 'http://localhost:5001',
                secure: false
            },
        }
    },
    resolve: {
        // root: [__dirname + '/app', __dirname + '/node_modules'],
        extensions: ['.js', '.jsx', '.css', '.scss', '.png', '.jpg'],
    },
    module: {
		rules: [
			{
				test: /\.jsx$/,
				exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    }
                }]
			},
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            }
		]
	}
};