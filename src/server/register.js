require('ignore-styles');

require('@babel/register')({
  presets: [
    ['@babel/preset-env', {
      targets: { node: true },
    }],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
  ],
});
