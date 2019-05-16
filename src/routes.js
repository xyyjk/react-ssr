import Home from './views/Home';
import About from './views/About';
import Contact from './views/Contact';
import Character from './views/Character';

export default [
  {
    name: 'Home',
    path: '/',
    component: Home,
    exact: true,
  },
  {
    name: 'About',
    path: '/about',
    component: About,
  },
  {
    name: 'Contact',
    path: '/contact',
    component: Contact,
  },
  {
    name: 'Character',
    path: '/character/:key',
    component: Character,
  },
];
