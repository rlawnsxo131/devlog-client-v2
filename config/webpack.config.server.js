const paths = require('./paths');
const initializeConfig = require('./env');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = () => {
  const env = initializeConfig({ target: 'server' });
  const { REACT_APP_NODE_ENV, REACT_APP_PUBLIC_URL } = process.env;
  return {
    entry: paths.ssrEntryPath,
    target: 'node',
    mode: REACT_APP_NODE_ENV,
    // webpack critical warning pass
    externals: [nodeExternals()],
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    output: {
      libraryTarget: 'commonjs',
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
          test: /\.(bmp|gif|png|jpe?g|svg)$/i,
          loader: 'file-loader',
          options: {
            outputPath: 'media',
            name: 'static/[name].[contenthash:8].[ext]',
            esModule: false,
          },
        },
        {
          test: /\.(bmp|gif|png|jpe?g|svg)$/i,
          loader: 'url-loader',
          options: {
            outputPath: 'media',
            name: 'static/[name].[contenthash:8].[ext]',
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
    },
    plugins: [
      new webpack.DefinePlugin(env),
      new webpack.NormalModuleReplacementPlugin(/codemirror/, {}),
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    ],
    optimization: {
      minimize: false,
    },
    externals: [
      nodeExternals(),
      // nodeExternals({
      //   whitelist: [/codemirror/, /\.css$/],
      // }),
    ],
    // node: {
    //   __dirname,
    // },
  };
};
