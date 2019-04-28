const Neutrino = require('neutrino/Neutrino');
const nodeExternals = require('webpack-node-externals');
const NormalPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const babelMerge = require('babel-merge');
const middleware = require('./.neutrinorc');

const neutrino = new Neutrino(middleware.options);
middleware.use.forEach(use => neutrino.use(use));

neutrino.config
  .target('node')

  .entryPoints
    .delete('index')
    .end()

  .entry('server')
    .add(`${__dirname}/src/server`)
    .end()

  .output
    .path(`${__dirname}/build`)
    .filename('[name].js')
    .chunkFilename('chunk.[name].js')
    .libraryTarget('commonjs2')
    .end()

  .externals([nodeExternals()])

  .plugins
    .delete('clean')
    .end()

  .plugin('normal')
    .use(NormalPlugin, [/\.css$/, 'lodash/noop'])
    .end()

  .optimization
    .minimize(false)
    .runtimeChunk(false)
    .splitChunks({ chunks: 'all' })
    .end()

  .module
    .rule('compile')
    .use('babel')
    .tap(options => babelMerge(options, {
      presets: [
        ['@babel/preset-env', {
          targets: { node: true },
        }],
      ],
    }));

module.exports = neutrino.config.toConfig();
