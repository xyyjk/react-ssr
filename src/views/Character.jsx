import React from 'react';
import useFetch from '../hooks/useFetch';

export default function Character(props) {
  const data = useFetch(props, Character);

  return (
    <>
      <h2>{data.name}</h2>
      <p>{data.about}</p>
      <img src={data.image_url} width="225" />
    </>
  );
}

Character.option = ({ req }) => ({
  url: `https://api.jikan.moe/v3/character/${req.params.key}`,
});
