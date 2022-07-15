import postcss from 'postcss'
import cloneNodes from '../utils/cloneNodes'
import escapeSelector from '../utils/escapeSelector'
import prefixSelector from '../utils/prefixSelector'

export default function applyAtRules(config) {
  return function (root) {
    function findRulesBySelector(selector) {
      const matches = []
      root.walkRules((rule) => {
        if (rule.selectors.includes(selector) && rule.parent.type === 'root') {
          matches.push(rule)
        }
      })

      return matches
    }

    root.walkAtRules('apply', (atRule) => {
      const classes = postcss.list.space(atRule.params)

      classes.forEach((className) => {
        const isImportant = className.startsWith('!')
        const selector = `.${isImportant ? className.slice(1) : className}`
        const matches = findRulesBySelector(
          prefixSelector(config.prefix, escapeSelector(selector))
        )

        if (!matches.length) {
          throw atRule.error(`Unkown selector ${selector}`)
        }

        if (matches.length > 1) {
          throw atRule.error(
            `\`@apply\` cannot be used with ${selector} because ${selector} is included in multiple rulesets`
          )
        }

        const decls = matches[0].nodes.map((decl) =>
          decl.clone({ important: isImportant })
        )
        atRule.before(cloneNodes(decls))
      })

      atRule.remove()
    })
  }
}
