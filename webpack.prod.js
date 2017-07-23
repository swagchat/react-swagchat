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
    filename: distDir + '/react-swagchat.min.js',
    publicPath: '/',
  },
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
            'css-loader',
            'postcss-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          })
        ]
      },
      minimize: true,
      debug: false
    }),
    new ExtractTextPlugin({
      filename: distDir + '/react-swagchat.min.css',
      disable: false,
      allChunks: true 
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   beautify: false,
    //   mangle: {
    //     screw_ie8: true,
    //     keep_fnames: true
    //   },
    //   compress: {
    //     screw_ie8: true
    //   },
    //   comments: false
    // })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx', 'css']
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