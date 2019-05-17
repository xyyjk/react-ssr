const React = require('react');
const { renderToString } = require('react-dom/server');
const { matchPath } = require('react-router-dom');
const { Helmet } = require('react-helmet');
const axios = require('axios');
const uuidv5 = require('uuid/v5');

const template = require('./template');
const { default: routes } = require('../routes');

function getOption({ req, res }) {
  const {
    component: { option = () => ({}) },
  } = routes.find(
    route => matchPath(req.url, route),
  );

  const context = {
    req, res, err: null,
    pathname: '', query: '',
    asPath: '',
  };

  const {
    url = '', params = {},
    cache = () => false,
  } = option(context);

  return { url, params, cache };
}

async function fetchData({ req, res }) {
  const { url, params, cache } = getOption({ req, res });

  if (!url) { return {}; }

  const data = await axios(url, { params })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      return {};
    });

  if (cache(data)) {
    // lru-cache
    console.log('Set Cache !');
  }

  return data;
}

module.exports = async ({ req, res }) => {
  const context = {
    data: await fetchData({ req, res }),
    uuid: uuidv5(req.url, uuidv5.URL),
    url: req.url,
  };

  const { default: App } = await import(/* webpackChunkName: 'app' */ '../App');
  const markup = renderToString(<App context={context} />);
  const helmet = Helmet.renderStatic();

  return template({ markup, helmet, context });
};
