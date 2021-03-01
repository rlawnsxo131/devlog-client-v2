process.env.PHASE = 'production';
const initializeConfig = require('./env');
const env = initializeConfig({ target: 'server' });

const paths = require('./paths');
const path = require('path');
const webpack = require('webpack');
const serverlessWebpack = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { REACT_APP_PUBLIC_URL } = env;

module.exports = {
  entry: serverlessWebpack.lib.entries,
  target: 'node',
  mode: serverlessWebpack.lib.webpack.isLocal ? 'development' : 'production',
  externals: [nodeExternals()],
  // webpack critical warning pass
  // nodeExternals({
  //   whitelist: [/codemirror/, /\.css$/],
  // }),
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  output: {
    libraryTarget: 'commonjs',
    path: paths.serverlessBuildPath,
    publicPath: REACT_APP_PUBLIC_URL,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[contenthash:8].[ext]',
          esModule: false,
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          name: 'static/media/[name].[contenthash:8].[ext]',
          limit: 10000,
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(env),
    new webpack.NormalModuleReplacementPlugin(/codemirror/, {}),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(paths.prodClientBuildPath, 'loadable-stats.json'),
          to: path.resolve(paths.serverlessBuildPath, 'service/client'),
        },
      ],
    }),
  ],
  optimization: {
    minimize: false,
  },
  node: {
    __dirname: false,
  },
};
