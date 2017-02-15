var path = require('path');
var webpack = require('webpack');

//plugins
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//filePaths
var APP_PATH = path.resolve(__dirname, 'frontend');
var OUTPUT_PATH = path.resolve(__dirname, 'dist');

//indexFile
var INDEX_FILE = path.resolve(APP_PATH, 'index.js');

module.exports = {
  entry: {
    app: [
      INDEX_FILE,
      // 'webpack-dev-server/client?http://localhost:8081', // WebpackDevServer host and port
      // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true' // "only" prevents reload on syntax errors
    ],
    vendor: ['react', 'react-dom', 'jquery']
  },
  devtool: 'source-map',
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
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap'),
        include: APP_PATH
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader"]
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
      },
    ]
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    inline: true,
    port: 8080
  },
  plugins: [
    new ExtractTextPlugin("css/bundle.css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom",
      $: "jquery",
      jquery: "jQuery"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
