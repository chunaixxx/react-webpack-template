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
	},

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		open: true,
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
					{loader: 'css-loader', options: {sourceMap: true, importLoaders: 1}},
					{loader: 'sass-loader', options: {sourceMap: true}},
				],
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
