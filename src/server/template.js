const jsesc = require('jsesc');

function renderAssets(assets, ext) {
  const files = [];

  Object.values(assets)
    .forEach((chunk) => {
      if (Array.isArray(chunk)) {
        chunk.forEach((path) => {
          if (ext.test(path)) {
            files.push(path);
          }
        });
      } else if (ext.test(chunk)) {
        files.push(chunk);
      }
    });

  return files;
}

const renderStyles = (assets, ext) => renderAssets(assets, ext)
  .map(path => `<link rel="stylesheet" href="${path}" />`).join('\n');

const renderScripts = (assets, ext) => renderAssets(assets, ext)
  .map(path => `<script src="${path}"></script>`).join('\n');

const isProd = process.env.NODE_ENV === 'production';

module.exports = ({ helmet, assets, ...props }) => `
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
    ${renderStyles(assets, /\.css$/)}
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    <div id="root">${props.markup}</div>
    <script>window.__INITIAL_DATA__ = ${jsesc(props.locals)}</script>
    ${renderScripts(assets, isProd ? /(runtime|chunk).+\.js$/ : /\.js$/)}
  </body>
</html>
`;
