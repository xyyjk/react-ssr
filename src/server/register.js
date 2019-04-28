require('ignore-styles');

require('@babel/register')({
  presets: [
    ['@babel/preset-env', {
      debug: false,
      targets: { node: true },
    }],
    '@babel/preset-react',
  ],
  plugins: [
    'dynamic-import-node',
    '@babel/plugin-proposal-class-properties',
  ],
});
