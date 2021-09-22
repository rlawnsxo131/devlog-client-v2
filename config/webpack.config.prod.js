const path = require('path');
const paths = require('./paths');
const initializeConfig = require('./env');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;

module.exports = () => {
  const clientEnv = initializeConfig({ target: 'web' });
  const { REACT_APP_NODE_ENV, REACT_APP_PUBLIC_URL, REACT_APP_IMAGE_URL } =
    process.env;
  const prefix = REACT_APP_NODE_ENV === 'production' ? '/' : '';
  return {
    mode: REACT_APP_NODE_ENV,
    entry: paths.entryPath,
    output: {
      path: paths.prodClientBuildPath,
      publicPath: `${REACT_APP_PUBLIC_URL}${prefix}`,
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    },
    target: 'web',
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
      minimize: true,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
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
            REACT_APP_PUBLIC_URL:
              REACT_APP_NODE_ENV === 'production'
                ? REACT_APP_PUBLIC_URL
                : prefix,
            REACT_APP_IMAGE_URL: REACT_APP_IMAGE_URL,
          },
        },
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
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
      new webpack.DefinePlugin(clientEnv),
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: `${REACT_APP_PUBLIC_URL}${prefix}`,
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
      new ForkTsCheckerWebpackPlugin(),
      new LoadablePlugin({
        filename: 'loadable-stats.json',
      }),
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
    },
  };
};
