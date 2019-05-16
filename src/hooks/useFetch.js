import { useState, useEffect } from 'react';

require('isomorphic-fetch');

function param(obj = {}) {
  const arr = Object.keys(obj);
  if (!arr.length) { return ''; }

  return `?${arr.map(key => `${key}=${encodeURIComponent(obj[key])}`).join('&')}`;
}


function hasCacheData() {
  if (!window.__INITIAL_DATA__) { return false; }
  const { pathname, search } = document.location;
  const docUrl = `${pathname}${search}`;
  return docUrl === window.__INITIAL_DATA__.url;
}


function getOption({ match }, component) {
  if (!process.browser) { return {}; }

  const { pathname, search } = document.location;
  const context = {
    req: { ...match }, res: {}, err: null,
    pathname, query: search,
    asPath: `${pathname}${search}`,
  };

  const {
    url = '', params = {},
    cache = () => false,
  } = component.option(context);

  return { url, params, cache };
}

async function getData(option) {
  if (hasCacheData()) {
    return window.__INITIAL_DATA__.data;
  }

  const { url, params, cache } = option;
  const results = await fetch(`${url}${param(params)}`);
  const data = results.status === 200 ? await results.json() : {};

  if (cache(data)) {
    console.log('Set Cache !');
  }

  return data;
}


export default function useFetch(props, component, dependencies) {
  const [data, setData] = useState({});
  const option = getOption(props, component);

  useEffect(() => {
    async function fetchData() {
      if (!process.browser) {
        const { staticContext = {} } = props;
        setData(staticContext.data || {});
        return;
      }

      setData(await getData(option));
    }

    fetchData();
  }, dependencies || [option.url]);

  return data;
}
