const postcss = require('postcss')
const cloneNodes = require('../utils/cloneNodes')

module.exports = function responsiveAtRule(config) {
  return function(root) {
    const rules = []

    root.walkAtRules('responsive', (atRule) => {
      rules.push(...cloneNodes(atRule.nodes))
      atRule.before(rules)
      atRule.remove()
    })

    if (!rules.length) {
      return
    }

    Object.keys(config.theme.screens).forEach((screen) => {
      const mediaAtRule = postcss
        .atRule({
          name: 'media',
          params: `(min-width: ${config.theme.screens[screen]})`,
        })
        .append(
          rules.map((rule) =>
            rule.clone({
              selectors: rule.selectors.map(
                (selector) => `.${screen}\\:${selector.slice(1)}`
              ),
            })
          )
        )

      root.append(mediaAtRule)
    })
  }
}
