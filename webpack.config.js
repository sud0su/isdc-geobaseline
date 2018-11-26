const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, '.');

var plugins = [];
var filename = '[name].js';
var PROD = JSON.parse(process.env.BUILD_PROD || true);
if(PROD) {
  plugins.push(new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }));
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compress:{ warnings: true } }));
  filename = '[name].bundle.js';
}

module.exports = {
  entry: {
    baseline: APP_DIR+'/src/components/baseline.jsx',
  },
  output:{
    path: BUILD_DIR,
    filename:filename,
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    publicPath: 'dist'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: plugins,
  resolveLoader: {
    modules: ['node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        // exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.es6$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
};
