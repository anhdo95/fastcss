const postcss = require('postcss')
const _ = require("lodash");

module.exports = function buildScreens(root, { config }) {
  const customMediaAtRules = _.toPairs(config.screens).map(([breakpoint, value]) => {
    return postcss.atRule({
      name: 'custom-media',
      params: `--${breakpoint} (min-width: ${value})`
    })
  });

  root.first.before(customMediaAtRules)
};
