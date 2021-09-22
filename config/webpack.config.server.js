const paths = require('./paths');
const initializeConfig = require('./env');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  const env = initializeConfig({ target: 'server' });
  const { REACT_APP_NODE_ENV, REACT_APP_PUBLIC_URL } = process.env;
  return {
    entry: paths.ssrEntryPath,
    target: 'node',
    mode: REACT_APP_NODE_ENV,
    externals: [nodeExternals()],
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    output: {
      path: paths.prodServerBuildPath,
      publicPath: REACT_APP_PUBLIC_URL,
      filename: 'server.js',
    },
    module: {
      rules: [
        {
          test: /\.(tsx|ts)$/,
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
          oneOf: [
            {
              loader: 'url-loader',
              options: {
                name: 'static/media/[name].[contenthash:8].[ext]',
                limit: 10000,
                esModule: false,
              },
            },
            {
              loader: 'file-loader',
              options: {
                name: 'static/media/[name].[contenthash:8].[ext]',
                esModule: false,
              },
            },
          ],
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
    resolve: {
      modules: ['node_modules'],
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      fallback: {
        path: require.resolve('path-browserify'),
        assert: require.resolve('assert'),
      },
    },
    optimization: {
      minimize: false,
    },
    plugins: [
      new webpack.DefinePlugin(env),
      new webpack.NormalModuleReplacementPlugin(/codemirror/, {}),
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    ],
    optimization: {
      minimize: false,
    },
    externals: [nodeExternals()],
  };
};
