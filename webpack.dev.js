const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var distDir = './dist';

module.exports = {
  name: 'client',
  entry: [
    './src/index.tsx',
    './src/index.css'
  ],
  output: {
    filename: distDir + '/react-swagchat.js',
    publicPath: '/',
    sourceMapFilename: 'react-swagchat.map',
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:[
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: false,
                minimize: true,
                camelCase: 'dashes',
                localIdentName: 'sc-[name]-[local]',
                importLoaders: 1
              }
            },
            'postcss-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: distDir + '/react-swagchat.css',
      ignoreOrder: true
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx', 'css']
  },
  devServer: {
    contentBase: 'public',
    port: 8000,
    inline: true
  },
  node: {
    fs: 'empty',
    net: 'empty'
  },
  externals: {
    'bindings': true,
    // 'react': 'React',
    // 'react-dom': 'ReactDOM'
  },
};