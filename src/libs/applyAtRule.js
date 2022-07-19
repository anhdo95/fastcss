import postcss from 'postcss'
import cloneNodes from '../utils/cloneNodes'
import escapeSelector from '../utils/escapeSelector'
import prefixSelector from '../utils/prefixSelector'
import useMemo from '../utils/useMemo'

const findRulesBySelector = useMemo(
  (root, selector) => {
    const matches = []
    root.walkRules((rule) => {
      if (rule.selectors.includes(selector) && rule.parent.type === 'root') {
        matches.push(rule)
      }
    })
    return matches
  },
  (_, selector) => selector
)

export default function applyAtRules(config) {
  return function (root) {
    const getMatchedRules = (selector) => findRulesBySelector(root, selector)

    root.walkAtRules('apply', (atRule) => {
      const parent = atRule.parent

      // Extract any post-apply declarations and re-insert them after apply rules
      const afterRule = parent.clone({ raws: {} })
      afterRule.nodes = parent.nodes.slice(parent.index(atRule) + 1)
      parent.nodes = parent.nodes.slice(0, parent.index(atRule) + 1)

      postcss.list.space(atRule.params).forEach((className) => {
        const isImportant = className.startsWith('!')
        const selector = `.${isImportant ? className.slice(1) : className}`

        if (parent.selector === selector) {
          throw parent.error(
            `You cannot @apply \`${selector}\` here because it creates a circular dependency`
          )
        }

        const matches = getMatchedRules(
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

      parent.append(cloneNodes(afterRule.nodes))
      atRule.remove()
    })
  }
}
