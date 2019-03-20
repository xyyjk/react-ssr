require('./register');

const decache = require('decache');
const routes = require('./routes');
let render = require('./render');

const handler = async (req, res, next) => {
  decache('./render');
  render = require('./render');
  res.send(await render({ req, res }));
  next();
};

module.exports = (app) => {
  app.get(routes, handler);
};
