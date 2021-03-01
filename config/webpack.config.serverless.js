process.env.PHASE = 'production';
const initializeConfig = require('./env');
const env = initializeConfig({ target: 'server' });
const { REACT_APP_PUBLIC_URL } = env;

const paths = require('./paths');
const path = require('path');
const webpack = require('webpack');
const serverlessWebpack = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: serverlessWebpack.lib.entries,
  target: 'node',
  mode: serverlessWebpack.lib.webpack.isLocal ? 'development' : 'production',
  externals: [
    nodeExternals({
      allowlist: [/node-fetch/, /@loadable\/server/, /html-to-react/, /qs/],
    }),
  ],
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
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: [
                '@loadable/babel-plugin',
                '@babel/plugin-syntax-dynamic-import',
              ],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      node: true,
                    },
                  },
                ],
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic',
                  },
                ],
                '@babel/preset-typescript',
              ],
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
    new ForkTsCheckerWebpackPlugin(),
  ],
  optimization: {
    minimize: false,
  },
  node: {
    __dirname: false,
  },
};
