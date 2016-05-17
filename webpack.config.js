// @AngularClass

var webpack = require('webpack');
var helpers = require('./helpers');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var path = require('path');

var ENV = process.env.ENV = process.env.NODE_ENV = 'development';
var HMR = process.argv.join('').indexOf('hot') > -1;

var metadata = {
  title: 'Buy back form',
  baseUrl: '/',
  host: '0.0.0.0',
  port: 3001,
  ENV: ENV,
  HMR: HMR
};
/*
 * Config
 */
module.exports = helpers.validate({
  // static data for index.html
  metadata: metadata,
  // for faster builds use 'eval'
  devtool: 'source-map',
  debug: true,
  // cache: false,

  // our angular app
  entry: {
    'polyfills': './src/polyfills.ts',
    'styleguide': './src/styleguide/app.ts',
    'shims': './shims/shims_for_IE'         // Following https://github.com/rangle/angular2-redux-starter/pull/81/files approach
  },

  // Config for our build files
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    // sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    root: [helpers.root(), path.join(__dirname, "node_modules")],
    extensions: ['', '.ts', '.async.ts', '.js', '.css', '.scss', '.html'],
    alias: {
        'angular2': path.resolve('node_modules/angular2')
    }
  },

  module: {
    preLoaders: [
      { test: /\.ts$/, loader: 'tslint-loader', exclude: [ helpers.root('ss') ] },
      // TODO(gdi2290): `exclude: [ helpers.root('node_modules/rxjs') ]` fixed with rxjs 5 beta.3 release
      { test: /\.js$/, loader: "source-map-loader", exclude: [ helpers.root('node_modules/rxjs'), helpers.root('node_modules/ng2-material') ] }
    ],
    loaders: [
      // Support for .ts files.
      { test: /\.ts$/, loader: 'ts-loader'},

      // copy those assets to output
      {test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'file?name=[path][name].[ext]?[hash]'},

      // Support for *.json files.
      { test: /\.json$/,  loader: 'json-loader' },

      // Support for CSS as raw text - old config ('raw-loader') - new ['style', 'css', 'resolve-url']
      { test: /\.css$/,   loader: 'css' },

      // Support for *.scss files - old config ('raw!postcss!sass') css?sourceMap&root=C:/ampdigital/digital-ddc-ui/!sass
      { test: /\.scss$/, loader: 'css!sass' },

      // support for .html as raw text
      { test: /\.html$/,  loader: 'raw-loader', exclude: [ helpers.root('src/index.html') ] },

    ]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    // Code splitting for all ComponentsService
    new webpack.optimize.CommonsChunkPlugin(
      { name: 'polyfills', filename: 'polyfills.bundle.js', minChunks: Infinity }
    ),

    // static assets
    new CopyWebpackPlugin([
        { from: 'src/assets', to: 'ddc/public' },
        { from: 'node_modules/ng2-material/dist', to: 'node_modules/ng2-material/dist' }
      ]),
    // generating html
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    // replace
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV),
        'HMR': HMR
      }
    })
  ],

  // Other module loader config
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },

  // our Webpack Development Server config
  devServer: {
    port: metadata.port,
    host: metadata.host,
    contentBase: '.',
    // publicPath: '/assets',
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    proxy: {
        '/ddc/public/*': {
            target: 'http://0.0.0.0:3001',
            rewrite: function (req) {
                req.url = req.url.replace(/^\/ddc\/public/, '/src/assets');
            }
        },
        '*/ddc/public/*': {
            target: 'http://0.0.0.0:3001',
            rewrite: function (req) {
                req.url = req.url.replace(/\/ddc\/public/, '/src/assets');
            }
        }
    }
  },
  // we need this due to problems with es6-shim
  node: {global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false}
});
