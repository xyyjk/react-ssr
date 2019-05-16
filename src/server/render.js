require('isomorphic-fetch');

const React = require('react');
const { renderToString } = require('react-dom/server');
const { matchPath } = require('react-router-dom');
const { Helmet } = require('react-helmet');
const template = require('./template');

const { default: routes } = require('../routes');

function param(obj = {}) {
  const arr = Object.keys(obj);
  if (!arr.length) { return ''; }

  return `?${arr.map(key => `${key}=${encodeURIComponent(obj[key])}`).join('&')}`;
}

async function fetchData({ req, res }) {
  const { component } = routes.find(
    route => matchPath(req.url, route),
  );

  if (!component.option) { return {}; }

  const context = {
    req, res, err: null,
    pathname: '', query: '',
    asPath: '',
  };

  const {
    url = '', params = {},
    cache = () => false,
  } = component.option(context);

  const results = await fetch(`${url}${param(params)}`);
  const data = results.status === 200 ? await results.json() : {};

  if (cache(data)) {
    console.log('Set Cache !');
  }

  return data;
}

module.exports = async ({ req, res }) => {
  const context = {
    data: await fetchData({ req, res }),
    url: req.url,
  };

  const { default: App } = await import(/* webpackChunkName: 'app' */ '../App');
  const markup = renderToString(<App context={context} />);
  const helmet = Helmet.renderStatic();

  return template({ markup, helmet, context });
};
