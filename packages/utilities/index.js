const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const postcssPresetEnv = require("postcss-preset-env");

const config = require("./src/default.config.js");
const processPlugins = require('./src/utils/processPlugins')
const useAtRule = require("./src/plugins/useAtRule");
const applyAtRule = require('./src/plugins/applyAtRule')
const variantsAtRule = require('./src/plugins/variantsAtRule')
const responsiveAtRule = require('./src/plugins/responsiveAtRule');

const from = "./css/main.css";
const to = "./dist/main.css";
const toMap = "./dist/main.css.map";

fs.readFile(from, function (err, styles) {
  const plugins = processPlugins(config)

  postcss([
    useAtRule(config, plugins),
    variantsAtRule(config, plugins),
    responsiveAtRule(config),
    applyAtRule(config),
    postcssPresetEnv,
  ])
    .process(styles, { from, to, map: { inline: false } })
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
