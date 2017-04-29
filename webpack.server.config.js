var webpack = require('webpack');
var path = require('path');
var nodeModules = {};
var fs = require('fs');

var BUILD_DIR = path.resolve(__dirname, 'dist');

module.exports = {
    entry: './server/app.js',
    target: 'node',
    output: {
        path: BUILD_DIR,
        filename: 'server.js'
    },
    externals: nodeModules,
    plugins: [
        //把入口文件里面的数组打包成verdors.js
        //new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.DefinePlugin({ "global.GENTLY": false }),

    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.png', '.jpg'],
    },
    module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    }
                }]
			}
		]
	}
};