import React from 'react';
import Content from '../comps/Content';

const Character = () => (
  <Content render={({ data }) => {
    const { animeography = [] } = data;

    return (
      <>
        <h2>{data.name}</h2>
        <p>{data.about}</p>
        <img src={data.image_url} width="225" />
      </>
    );
  }} />
);

export default Character;
