import postcss from 'postcss'
import tap from 'lodash/tap'

function updateSource(nodes, source) {
  const tree = Array.isArray(nodes) ? postcss.root({ nodes }) : nodes
  tree.walk((node) => (node.source = source))
  return tree
}

export default function utilitiesAtRule(config, plugins = {}) {
  return function (root) {
    const { base, components, utilities } = plugins

    root.walkAtRules('use', (atRule) => {
      if (atRule.params === 'base') {
        atRule.before(updateSource(base, atRule.source))
      }

      if (atRule.params === 'components') {
        atRule.before(updateSource(components, atRule.source))
      }

      if (atRule.params === 'utilities') {
        atRule.before(updateSource(utilities, atRule.source))
      }

      atRule.remove()
    })
  }
}
