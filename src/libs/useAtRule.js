import postcss from 'postcss'

function updateSource(nodes, atRule) {
  const tree = Array.isArray(nodes) ? postcss.root({ nodes }) : nodes
  tree.walk((node) => (node.source = atRule.source))
  return tree
}

export default function utilitiesAtRule(config, plugins = {}) {
  return function (root) {
    const { base, components, utilities } = plugins

    root.walkAtRules('use', (atRule) => {
      if (atRule.params === 'base') {
        atRule.before(updateSource(base, atRule))
      }

      if (atRule.params === 'components') {
        atRule.before(updateSource(components, atRule))
      }

      if (atRule.params === 'utilities') {
        atRule.before(updateSource(utilities, atRule))
      }

      atRule.remove()
    })
  }
}
