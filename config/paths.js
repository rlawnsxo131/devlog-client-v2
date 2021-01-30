const path = require('path');

const rootPath = path.resolve(__dirname, '../');
const entryPath = path.resolve(__dirname, '../src', 'index.tsx');
const staticPath = path.resolve(__dirname, '../src', 'static');
const ssrEntryPath = path.resolve(__dirname, '../src', 'index.server.ts');
const publicPath = path.resolve(__dirname, '../public');
const devBuildPath = path.resolve(__dirname, '../build', 'dev');
const prodClientBuildPath = path.resolve(__dirname, '../build', 'client');
const prodServerBuildPath = path.resolve(__dirname, '../build', 'server');

module.exports = {
  rootPath,
  entryPath,
  ssrEntryPath,
  staticPath,
  publicPath,
  devBuildPath,
  prodClientBuildPath,
  prodServerBuildPath,
};
