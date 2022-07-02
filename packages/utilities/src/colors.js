const postcss = require('postcss')
const _ = require("lodash");

module.exports = function buildColors(root, { config }) {
  const textColors = []
  const bgColors = []

  function buildTextColors(name, value) {
    const decl = postcss.decl({
      prop: 'color',
      value,
      raws: {
        before: '\n  ',
      }
    })
    const rule = postcss.rule({
      selector: `.text-${name}`,
    }).append(decl)

    textColors.push(rule)
  }

  function buildBgColors(name, value) {
    const decl = postcss.decl({
      prop: 'background-color',
      value,
      raws: {
        before: '\n  ',
      }
    })
    const rule = postcss.rule({
      selector: `.bg-${name}`,
    }).append(decl)

    bgColors.push(rule)
  }

  _.toPairs(config.colors).forEach(([color, value]) => {
    const name = _.kebabCase(color)
    
    buildTextColors(name, value)
    buildBgColors(name, value)
  });

  return {
    textColors,
    bgColors
  }
};
