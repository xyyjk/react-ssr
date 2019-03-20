const { default: routes } = require('../utils/routes');

module.exports = routes.map(({ path }) => path);
