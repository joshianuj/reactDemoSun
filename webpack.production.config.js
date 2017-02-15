var path = require('path');
var webpack = require('webpack');

//plugins
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//filePaths
var APP_PATH = path.resolve(__dirname, 'src');
var OUTPUT_PATH = path.resolve(__dirname, 'dist');

//indexFile
var INDEX_FILE = path.resolve(APP_PATH, 'index.js');

module.exports = {
  entry: {
    app: INDEX_FILE,
    vendor: ['react', 'react-dom']
  },
  output: {
    path: OUTPUT_PATH,
    publicPath: '/',
    filename: 'bundle.[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass'),
        include: APP_PATH
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader : 'file-loader',
        query: {
          name: 'css/fonts/[name].[ext]'
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader : 'file-loader',
        query: {
          name: 'css/images/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("css/bundle.css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom"
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
