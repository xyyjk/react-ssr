import React from 'react';
import { BrowserRouter, StaticRouter, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Layout from './comps/Layout';
import routes from './routes';

import './static/style.css';

const Router = process.browser ? BrowserRouter : StaticRouter;

const App = ({ context = {} }) => (
  <Router location={context.url} context={context}>
    <Layout>
      {
        routes.map(({ name, ...route }) => (
          <Route key={name} {...route} />
        ))
      }
    </Layout>
  </Router>
);

export default hot(App);
