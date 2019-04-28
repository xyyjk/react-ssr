const react = require('@neutrinojs/react');

const isDev = process.env.NODE_ENV !== 'production';
const isSSR = process.argv.includes('--ssr');

module.exports = {
  use: [
    react({
      devServer: {
        port: isSSR ? 3000 : 5000,
        host: '0.0.0.0',
        disableHostCheck: true,
        contentBase: `${__dirname}/src`,
        before(app) { if(isSSR) { require('./src/server')(app); } },
      },
      html: isSSR ? false: {},
      clean: { paths: ['./node_modules/.cache']},
    }),

    ({ config }) => {
      if (isDev) { return; }

      config
        .output
          .filename('assets/[name].[chunkhash].js')
          .chunkFilename('assets/chunk.[chunkhash].js')
          .end()
        .optimization
          .minimize(false)
          .end();
    },
  ],
};
