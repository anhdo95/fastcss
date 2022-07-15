import postcss from 'postcss'

function updateSource(nodes, atRule) {
  const tree = Array.isArray(nodes) ? postcss.root({ nodes }) : nodes
  tree.walk((node) => (node.source = atRule.source))
  return tree
}

export default function utilitiesAtRule(config, plugins = {}) {
  return function (root) {
    const { pluginBases, pluginComponents, pluginUtilities } = plugins

    root.walkAtRules('use', (atRule) => {
      if (atRule.params === 'base') {
        atRule.before(updateSource(pluginBases, atRule))
      }

      if (atRule.params === 'components') {
        atRule.before(updateSource(pluginComponents, atRule))
      }

      if (atRule.params === 'utilities') {
        atRule.before(updateSource(pluginUtilities, atRule))
      }

      atRule.remove()
    })
  }
}
