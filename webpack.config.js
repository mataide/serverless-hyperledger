const path = require('path')
const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false
  },
  plugins:  [
    new CopyWebpackPlugin([{
      context: `./.composer`,
      from: '**/*',
      to: './.composer',
      force: true
    }], {
      copyUnmodified: true
    })
  ],
  devtool: 'nosources-source-map',
  externals: [nodeExternals( { whitelist: [ 'composer-client', 'composer-admin', 'composer-connector-hlfv1', 'grpc'] } ) ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
    sourceMapFilename: '[file].map'
  }
}