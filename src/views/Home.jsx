import React from 'react';
import { Link } from 'react-router-dom';
import Content from '../comps/Content';

const Home = () => (
  <Content render={({ data }) => {
    const { characters = [] } = data;

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
  }} />
);

export default Home;
