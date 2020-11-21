const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV.trim() == 'development';

module.exports = {
	devtool: isDev ? 'source-map' : false,

	entry: './src/index.js',

	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
		publicPath: '/'
	},

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		historyApiFallback: true,
		compress: true,
		open: true,
	},

	resolve: {
		alias: {
			'@components': path.resolve(__dirname, 'src/components'),
			'@styles': path.resolve(__dirname, 'src/styles'),
			'@images': path.resolve(__dirname, 'src/images')
		}
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.sass$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { sourceMap: true, importLoaders: 1 },
					},
					{ loader: 'sass-loader', options: { sourceMap: true } },
				],
			},
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				use: {
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: '[name].[ext]',
						publicPath: './images/',
						outputPath: './images/',
					},
				},
			},
		],
	},

	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'bundle.[contenthash].css',
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
	],
};
