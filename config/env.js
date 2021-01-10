const path = require('path');
const paths = require('./paths');
const { config } = require('dotenv');
const { PHASE } = process.env;

function initializeConfig() {
  config({
    path: path.resolve(paths.rootPath, `.env.${PHASE}`),
  });
}

module.exports = initializeConfig;
