import React from 'react';
import { BrowserRouter, StaticRouter, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Layout from './comps/Layout';

import Home from './views/Home';
import About from './views/About';
import Contact from './views/Contact';
import Character from './views/Character';

import './static/style.css';

const Router = process.browser ? BrowserRouter : StaticRouter;

const App = ({ locals = {} }) => (
  <Router location={locals.url} context={locals}>
    <Layout>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/character/:key" component={Character}/>
    </Layout>
  </Router>
);

export default hot(App);
