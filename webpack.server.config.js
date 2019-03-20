const Neutrino = require('neutrino/Neutrino');
const nodeExternals = require('webpack-node-externals');
const NormalPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const babelMerge = require('babel-merge');
const config = require('./.neutrinorc');

const neutrino = new Neutrino();

neutrino.use(config);

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
    .filename('server.js')
    .libraryTarget('commonjs2')
    .end()

  .externals([nodeExternals()])

  .plugins
    .delete('clean')
    .delete('manifest')
    .end()

  .plugin('normal')
    .use(NormalPlugin, [/\.css$/, 'lodash/noop'])
    .end()

  .optimization
    .minimize(false)
    .runtimeChunk(false)
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
