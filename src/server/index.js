if (process.env.NODE_ENV === 'production') {
  module.exports = require('./app');
} else {
  module.exports = require('./dev');
}
