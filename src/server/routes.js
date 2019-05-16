const { default: routes } = require('../routes');

module.exports = routes.map(({ path }) => path);
