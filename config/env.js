const path = require('path');
const paths = require('./paths');
const { config } = require('dotenv');
const { PHASE } = process.env;

function initializeConfig({ target }) {
  const baseEnv = { REACT_APP_SSR: target === 'web' ? 'disabled' : 'enabled' };
  config({
    path: path.resolve(paths.rootPath, `.env.${PHASE}`),
  });
  return {
    'process.env': JSON.stringify(
      Object.keys(process.env)
        .filter((key) => /^REACT_APP/i.test(key))
        .reduce((env, key) => {
          env[key] = process.env[key];
          return env;
        }, baseEnv),
    ),
  };
}

module.exports = initializeConfig;
