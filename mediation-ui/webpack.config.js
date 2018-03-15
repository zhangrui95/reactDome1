var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    // 'webpack-hot-middleware/client',
    // 'webpack/hot/dev-server',
    index:'./src/index.js',
    vendor: ['antd','babel-polyfill','classnames','humps','isomorphic-fetch','lodash','normalizr',
      'react','react-dom','redux','react-redux','react-router','react-router-redux','redux-logger','redux-thunk',
      'redbox-react','react-proxy','react-transform-catch-errors','react-transform-hmr',
      'redux-devtools','redux-devtools-log-monitor','redux-devtools-dock-monitor','fetch-mock',
      'rc-queue-anim']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
    // new webpack.ProvidePlugin({
    //   jQuery:'jquery',
    //   $:'jquery'
    // }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/,loaders: [ 'babel' ],exclude: /node_modules/,include: __dirname},
      {test: /\.css?$/,loaders: [ 'style', 'raw' ],include: __dirname}
    ]
  },
  resolve:{
    alias:{
      // jquery:'jquery-3.1.0'
    }
  }
};
