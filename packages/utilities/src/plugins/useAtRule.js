const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const generateModules = require('../utils/generateModules')

module.exports = function utilitiesAtRule(config, plugins = {}) {
  return function (root) {
    const { pluginComponents, pluginUtilities } = plugins

    root.walkAtRules('use', (atRule) => {
      if (atRule.params === 'preflight') {
        const preflightTree = postcss.parse(
          fs.readFileSync(
            path.resolve(__dirname, '../../css/preflight.css'),
            'utf-8'
          )
        )
        preflightTree.walk((node) => (node.source = atRule.source))
        atRule.before(preflightTree)
      }

      if (atRule.params === 'components') {
        const pluginComponentTree = postcss.root({
          nodes: pluginComponents,
        })
        pluginComponentTree.walk((node) => (node.source = atRule.source))
        atRule.before(pluginComponentTree)
      }

      if (atRule.params === 'utilities') {
        const utilityTree = postcss.root({
          nodes: generateModules(config),
        })

        const pluginUtilityTree = postcss.root({
          nodes: pluginUtilities,
        })

        utilityTree.walk((node) => (node.source = atRule.source))
        pluginUtilityTree.walk((node) => (node.source = atRule.source))

        atRule.before(utilityTree)
        atRule.before(pluginUtilityTree)
      }

      atRule.remove()
    })
  }
}
