import { useState, useEffect } from 'react';
import axios from 'axios';
import uuidv5 from 'uuid/v5';

const { CancelToken } = axios;
const source = CancelToken.source();

function hasCacheData() {
  if (!window.__INITIAL_DATA__) { return false; }
  const { pathname, search } = document.location;
  const url = `${pathname}${search}`;
  const uuid = uuidv5(url, uuidv5.URL);
  return uuid === window.__INITIAL_DATA__.uuid;
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
  const data = await axios(url, {
    params, cancelToken: source.token,
  })
    .then(res => res.data)
    .catch((err) => {
      console.log(err);
      return {};
    });

  if (cache(data)) {
    // sessionStorage
    console.log('Set Cache !');
  }

  return data;
}

export default function useFetch(props, component, dependencies = []) {
  const [data, setData] = useState({});
  const option = getOption(props, component);

  async function fetchData() {
    if (!process.browser) {
      const { staticContext = {} } = props;
      setData(staticContext.data || {});
      return;
    }

    setData(await getData(option));
  }

  useEffect(() => {
    fetchData();
  }, dependencies);

  return data;
}
