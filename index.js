const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const postcssPresetEnv = require("postcss-preset-env");

const corePlugins = require("./src/core/plugins")
const resolveConfig = require('./src/utils/resolveConfig')
const processPlugins = require('./src/utils/processPlugins')
const useAtRule = require("./src/libs/useAtRule");
const evaluateFunctions = require("./src/libs/evaluateFunctions");
const applyAtRule = require('./src/libs/applyAtRule')
const variantsAtRule = require('./src/libs/variantsAtRule')
const responsiveAtRule = require('./src/libs/responsiveAtRule');

const from = "./css/main.css";
const to = "./dist/main.css";
const toMap = "./dist/main.css.map";

fs.readFile(from, function (err, styles) {
  function getConfig() {
    if (!fs.existsSync('./fast.config.js')) {
      return resolveConfig([require('./src/default.config.js')])
    }

    return resolveConfig([
      require('./fast.config.js'),
      require('./src/default.config.js')
    ])
  }
  const config = getConfig()
  const plugins = processPlugins([...corePlugins(config), ...config.plugins], config)

  postcss([
    useAtRule(config, plugins),
    evaluateFunctions(config),
    variantsAtRule(config, plugins),
    responsiveAtRule(config),
    applyAtRule(config),
    postcssPresetEnv,
    function (root) {
      root.rawCache = {
        colon: ': ',
        indent: '  ',
        beforeDecl: '\n',
        beforeRule: '\n',
        beforeOpen: ' ',
        beforeClose: '\n',
        beforeComment: '\n',
        after: '\n',
        emptyBody: '',
        commentLeft: ' ',
        commentRight: ' ',
        semicolon: false
      }
    },
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
