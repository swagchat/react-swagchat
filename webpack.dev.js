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
        use: [
          'react-hot-loader',
          'ts-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:[
            'css-loader',
            'postcss-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          })
        ]
      }
    }),
    new ExtractTextPlugin({
      filename: distDir + '/react-swagchat.css',
      disable: false,
      allChunks: true 
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