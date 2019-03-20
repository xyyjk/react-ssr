require('isomorphic-fetch');

async function fetchData({ req = {}, match = {} }) {
  let url = 'https://api.jikan.moe/v3';

  const path = req.path || match.path;
  const { key } = req.params || match.params;

  if (path === '/') {
    url += '/manga/1/characters';
  } else if (path.indexOf('/character/') !== -1) {
    url += `/character/${key}`;
  }

  const res = await fetch(url);
  const results = await res.json();

  return res.status === 200 ? results : {};
}

export default fetchData;
