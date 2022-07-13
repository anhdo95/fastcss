const postcss = require('postcss')
const generateVariantFunction = require('../utils/generateVariantFunction')

function generateVariant(variant) {
  return generateVariantFunction(({ className, separator }) => {
    return `.${variant}${separator}${className}:${variant}`
  })
}

const variantGenerators = {
  'group-hover': generateVariantFunction(({ className, separator }) => {
    return `.group:hover .group-hover${separator}${className}`
  }),
  hover: generateVariant('hover'),
  focus: generateVariant('focus'),
  active: generateVariant('active'),
  disabled: generateVariant('disabled'),
  even: generateVariant('even'),
  odd: generateVariant('odd'),
  'first-child': generateVariant('first-child'),
  'last-child': generateVariant('last-child'),
}

module.exports = function variantsAtRule(config, plugins = {}) {
  return function (root) {
    root.walkAtRules('variants', (atRule) => {
      const generators = {
        ...variantGenerators,
        ...plugins.pluginVariantGenerators,
      }
      const variants = postcss.list.comma(atRule.params)

      if (variants.includes('responsive')) {
        const responsiveParent = postcss.atRule({ name: 'responsive' })
        atRule.before(responsiveParent)
        responsiveParent.append(atRule)
      }

      atRule.before(atRule.clone().nodes)

      console.log('variants :>> ', variants);

      variants.forEach((variant) => {
        if (generators[variant]) {
          generators[variant](atRule)
        }
      })

      atRule.remove()
    })
  }
}
