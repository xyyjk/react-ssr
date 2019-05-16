import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function Home(props) {
  const { characters = [] } = useFetch(props, Home);

  return (
    <>
      <h2>Anime Series</h2>
      <ul>
        {
          characters.map(item => (
            <li key={item.mal_id}>
              <h3>
                <Link to={`/character/${item.mal_id}`}>
                  {item.name}
                </Link>
              </h3>
            </li>
          ))
        }
      </ul>
    </>
  );
}


Home.option = ctx => ({
  url: 'https://api.jikan.moe/v3/manga/1/characters',
  params: { a: 1, b: 2 },
  cache(data) {
    console.log(ctx.req.url, typeof data);
    return true;
  },
});
