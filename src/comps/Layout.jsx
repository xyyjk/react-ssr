import React from 'react';
import Helmet from 'react-helmet';
import { NavLink } from 'react-router-dom';

const Layout = ({ children }) => (
  <>
    <Helmet
      defaultTitle="My Default Title"
      titleTemplate="My Site - %s"
    />

    <h1>Welcome to React SSR!</h1>

    <nav>
      <NavLink exact to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>

    {children}
  </>
);

export default Layout;
