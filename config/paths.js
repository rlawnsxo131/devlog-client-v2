const path = require('path');

const rootPath = path.resolve(__dirname, '../');
const entryPath = path.resolve(__dirname, '../src', 'index.tsx');
const buildPath = path.resolve(__dirname, '../build');
const publicPath = path.resolve(__dirname, '../public');
const devBuildPath = path.resolve(__dirname, '../build', 'dev');
const prodBuildPath = path.resolve(__dirname, '../build', 'prod');

module.exports = {
  rootPath,
  entryPath,
  buildPath,
  publicPath,
  devBuildPath,
  prodBuildPath,
};
