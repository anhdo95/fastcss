const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const postcssPresetEnv = require("postcss-preset-env");

const defaultConfig = require("./src/default.config.js");
const utilities = require("./src/plugins/utilitiesAtRule");
const customMedia = require("./src/plugins/customMedia.js");
const preflightAtRule = require('./src/plugins/preflightAtRule')
const applyAtRule = require('./src/plugins/applyAtRule')
const hoverableAtRule = require('./src/plugins/hoverableAtRule')
const responsiveAtRule = require('./src/plugins/responsiveAtRule');

const from = "./css/main.css";
const to = "./dist/main.css";
const toMap = "./dist/main.css.map";

fs.readFile(from, function (err, styles) {
  const opts = { from, to, map: { inline: false }, config: defaultConfig };
  const plugins = [
    preflightAtRule,
    customMedia,
    utilities,
    hoverableAtRule,
    responsiveAtRule,
    applyAtRule,
    postcssPresetEnv,
  ]

  postcss(plugins)
    .process(styles, opts)
    .then((result) => {
      if (!fs.existsSync(to)) {
        fs.mkdirSync(path.dirname(to), { recursive: true });
      }

      fs.writeFileSync(to, result.css);
      if (result.map) {
        fs.writeFileSync(toMap, JSON.stringify(result.map));
      }
    });
});
