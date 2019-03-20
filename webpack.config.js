const neutrino = require('neutrino');

const clientConfig = neutrino().webpack();
const serverConfig = require('./webpack.server.config.js');

const isDev = process.env.NODE_ENV !== 'production';
const isSSR = process.argv.includes('--ssr');

module.exports = (!isDev && isSSR) ? serverConfig : clientConfig;
