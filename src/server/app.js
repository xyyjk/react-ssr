const express = require('express');

const routes = require('./routes');
const render = require('./render');

const app = express();
const port = process.env.PORT || 3000;

app.use('/assets', express.static('build/assets'));

app.get(routes, async (req, res) => {
  res.send(await render({ req, res }));
});

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    throw err;
  }

  console.log(`> Ready on http://localhost:${port}`);
});

module.exports = app;
