const path = require('path');
const paths = require('./paths');

require('dotenv').config({
  path: path.resolve(paths.rootPath, '.env.production'),
});
const {
  REACT_APP_NODE_ENV,
  REACT_APP_BUILD_TARGET,
  REACT_APP_PUBLIC_URL,
} = process.env;

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;

function getClientEnv() {
  return {
    'process.env': JSON.stringify(
      Object.keys(process.env)
        .filter((key) => /^REACT_APP/i.test(key))
        .reduce(
          (env, key) => {
            env[key] = process.env[key];
            return env;
          },
          { REACT_APP_SSR: 'disabled' },
        ),
    ),
  };
}

module.exports = (mode) => {
  const clientEnv = getClientEnv();
  return {
    mode: REACT_APP_NODE_ENV,
    entry: paths.entryPath,
    output: {
      path: paths.prodBuildPath,
      publicPath: REACT_APP_PUBLIC_URL,
      filename: 'static/js/[name].[contenthash].js',
      chunkFilename: 'static/js/[name].[contenthash].chunk.js',
    },
    target: REACT_APP_BUILD_TARGET,
    devtool: 'hidden-source-map',
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
                transpileOnly: false,
              },
            },
          ],
        },
        {
          loader: 'file-loader',
          exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          options: {
            outputPath: 'static/media',
            name: '[name].[contenthash].[ext]',
            esModule: false,
          },
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: 'url-loader',
          options: {
            limit: 10000,
            outputPath: 'static/media',
            name: '[name].[contenthash].[ext]',
          },
        },
      ],
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.tsx', '.ts', '.js'],
      fallback: {
        path: false,
      },
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
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
        template: path.resolve(paths.publicPath, 'index.html'),
        filename: 'index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash].css',
        chunkFilename: 'static/css/[name].[contenthash].chunk.css',
      }),
      new webpack.DefinePlugin(clientEnv),
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: `${REACT_APP_PUBLIC_URL}/`,
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
      new CleanWebpackPlugin(),
      // new BundleAnalyzerPlugin(),
    ].filter(Boolean),
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
    },
    stats: {
      builtAt: true,
      children: true,
      entrypoints: true,
      hash: true,
      modules: true,
      version: true,
      publicPath: true,
      // excludeAssets: [/\.(map|txt|html|jpg|png)$/, /\.json$/],
      // warningsFilter: [/exceed/, /performance/],
    },
  };
};
