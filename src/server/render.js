const React = require('react');
const { renderToString } = require('react-dom/server');
const { Helmet } = require('react-helmet');
const template = require('./template');

const { default: fetchData } = require('../utils/fetchData');

module.exports = async ({ req, res }) => {
  const locals = {
    data: await fetchData({ req, res }),
    url: req.url,
  };

  const { default: App } = await import(/* webpackChunkName: 'app' */ '../App');
  const markup = renderToString(<App locals={locals} />);
  const helmet = Helmet.renderStatic();

  return template({ markup, helmet, locals });
};
