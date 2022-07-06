const postcss = require('postcss')

const variantGenerators = {
  hover(atRule) {
    const cloned = atRule.clone()

    cloned.walkRules((rule) => {
      rule.selector = `.hover\\:${rule.selector.slice(1)}:hover`
    })

    atRule.after(cloned.nodes)
  },
  focus(atRule) {
    const cloned = atRule.clone()

    cloned.walkRules((rule) => {
      rule.selector = `.focus\\:${rule.selector.slice(1)}:focus`
    })

    atRule.after(cloned.nodes)
  },
}

module.exports = function variantsAtRule(root) {
  root.walkAtRules('variants', (atRule) => {
    const variants = postcss.list.comma(atRule.params)

    if (variants.includes('responsive')) {
      const responsiveParent = postcss.atRule({ name: 'responsive' })
      atRule.before(responsiveParent)
      responsiveParent.append(atRule)
    }

    atRule.before(atRule.clone().nodes)
    ;['hover', 'focus'].forEach((variant) => {
      if (variants.includes(variant)) {
        variantGenerators[variant](atRule)
      }
    })

    atRule.remove()
  })
}
