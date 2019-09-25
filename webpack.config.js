const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const indextInput = './src/pug/index.pug';
const indexOutput = './index.html';

const webpackInitConfig = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCSSExtractPlugin.loader,
					'css-loader',
					'sass-loader'
        ]
			},
			{
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name:'[name].[ext]',
              outputPath: 'assets/fonts',
              publicPath: '../assets/fonts'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name:'[name].[ext]',
              outputPath: 'assets/images',
              publicPath: './assets/images'
            }
          }
        ]
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: indexOutput,
      template: indextInput,
    }),
    new MiniCSSExtractPlugin({
      filename: './css/[name].css',
      chunkFilename: '[id].css'
    }),
	],
};

module.exports = webpackInitConfig;
