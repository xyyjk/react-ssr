import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const renderMethod = ReactDOM[module.hot ? 'render' : 'hydrate'];
renderMethod(<App />, document.getElementById('root'));
