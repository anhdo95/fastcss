const postcss = require('postcss')
const _ = require("lodash");

module.exports = function generateCustomMedia(root, { config }) {
  const customMediaAtRules = _.toPairs(config.screens).map(([screen, value]) => {
    return postcss.atRule({
      name: 'custom-media',
      params: `--${screen} (min-width: ${value})`
    })
  });

  root.first.before(customMediaAtRules)
};
