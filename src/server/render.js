const React = require('react');
const { renderToString } = require('react-dom/server');
const { Helmet } = require('react-helmet');
const template = require('./template');

const { default: App } = require('../App');
const { default: fetchData } = require('../utils/fetchData');

let assets;

if (process.env.NODE_ENV !== 'production') {
  assets = {
    'runtime.js': '/assets/runtime.js',
    'vendors.js': '/assets/vendors~index.js',
    'index.js': '/assets/index.js',
  };
} else {
  assets = require('../../build/manifest.json');
}

module.exports = async ({ req, res }) => {
  const locals = {
    data: await fetchData({ req, res }),
    href: `${req.protocol}://${req.headers.host}${req.url}`,
    url: req.url,
  };

  const markup = renderToString(<App locals={locals} />);
  const helmet = Helmet.renderStatic();

  return template({ markup, helmet, assets, locals });
};
