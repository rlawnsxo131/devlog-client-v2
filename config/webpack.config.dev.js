const path = require('path');
const paths = require('./paths');
const initializeConfig = require('./env');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = () => {
  const clientEnv = initializeConfig({ target: 'web' });
  const { REACT_APP_NODE_ENV, REACT_APP_PUBLIC_URL } = process.env;
  return {
    mode: REACT_APP_NODE_ENV,
    entry: paths.entryPath,
    output: {
      path: paths.devBuildPath,
      publicPath: REACT_APP_PUBLIC_URL,
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].js',
    },
    target: 'web',
    devtool: 'cheap-module-source-map',
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
          test: /\.(bmp|gif|png|jpe?g|svg)$/i,
          loader: 'file-loader',
          options: {
            outputPath: 'static/media',
            name: '[name].[contenthash:8].[ext]',
            esModule: false,
          },
        },
        {
          test: /\.(bmp|gif|png|jpe?g|svg)$/i,
          loader: 'url-loader',
          options: {
            outputPath: 'static/media',
            name: '[name].[contenthash:8].[ext]',
            limit: 10000,
          },
        },
      ],
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      fallback: {
        path: false,
      },
    },
    optimization: {
      minimize: false,
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      runtimeChunk: {
        name: (entrypoint) => `runtime-${entrypoint.name}`,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(paths.publicPath, 'index.html'),
        templateParameters: {
          env: {
            REACT_APP_NODE_ENV,
            REACT_APP_PUBLIC_URL,
          },
        },
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: REACT_APP_PUBLIC_URL,
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          const entrypointFiles = entrypoints.main.filter(
            (fileName) => !fileName.endsWith('.map'),
          );
          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
      new webpack.DefinePlugin(clientEnv),
      new webpack.HotModuleReplacementPlugin(),
      REACT_APP_NODE_ENV === 'production' &&
        new LoadablePlugin({
          filename: 'loadable-stats.json',
          writeToDisk: true,
        }),
    ].filter(Boolean),
    cache: {
      type: 'memory',
    },
    devServer: {
      // host: '',
      publicPath: '/',
      port: 8080,
      open: true,
      overlay: true,
      historyApiFallback: true,
      stats: 'errors-warnings',
    },
    stats: {
      builtAt: true,
      children: true,
      entrypoints: true,
      hash: true,
      modules: true,
      version: true,
      publicPath: true,
      warningsFilter: [/exceed/, /performance/],
      // excludeAssets: [/\.(map|txt|html|jpg|png)$/, /\.json$/],
    },
  };
};
