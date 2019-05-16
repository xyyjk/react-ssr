const fs = require('fs');
const jsesc = require('jsesc');

if (process.env.NODE_ENV === 'production') {
  module.exports = ({ markup, helmet, context }) => (
    fs.readFileSync('build/index.html', 'utf8')
      .replace(
        '<html>',
        `<html ${helmet.htmlAttributes.toString()}>`,
      )
      .replace(
        /<title>.*<\/title>/,
        `${helmet.title.toString()}`,
      )
      .replace(
        '</head>',
        `${helmet.meta.toString()}${helmet.link.toString()}</head>`,
      )
      .replace(
        '<body>',
        `<body ${helmet.bodyAttributes.toString()}>`,
      )
      .replace(
        '<div id="root"></div>',
        `<div id="root">${markup}</div><script>window.__INITIAL_DATA__ = ${jsesc(context)}</script>`,
      )
  );
} else {
  module.exports = ({ helmet, markup, context }) => `
    <!DOCTYPE html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        <meta charset="UTF-8">
        <meta name="renderer" content="webkit" />
        <meta http-equiv="Cache-Control" content="no-transform" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${markup}</div>
        <script>window.__INITIAL_DATA__ = ${jsesc(context)}</script>
        <script src="/assets/runtime.js"></script>
        <script src="/assets/vendors~index.js"></script>
        <script src="/assets/index.js"></script>
      </body>
    </html>
  `;
}
