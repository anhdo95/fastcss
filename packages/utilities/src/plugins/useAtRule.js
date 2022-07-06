const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const generateModules = require('../utils/generateModules')
const processPlugins = require('../utils/processPlugins')

module.exports = function utilitiesAtRule(root, { opts }) {
  const [pluginComponents, pluginUtilities] = processPlugins(opts.config)

  root.walkAtRules('use', atRule => {
    if (atRule.params === 'preflight') {
      const preflightPath = path.resolve(__dirname, '../../css/preflight.css')
      const css = postcss.parse(fs.readFileSync(preflightPath, 'utf-8'))
      atRule.before(css)
    }

    if (atRule.params === 'components') {
      const pluginComponentTree = postcss.root({
        nodes: pluginComponents
      })
      pluginComponentTree.walk(node => node.source = atRule.source)
      atRule.before(pluginComponentTree)
    }

    if (atRule.params === 'utilities') {
      const utilityTree = postcss.root({
        nodes: generateModules(opts.config)
      })

      const pluginUtilityTree = postcss.root({
        nodes: pluginUtilities
      })

      utilityTree.walk(node => node.source = atRule.source)
      pluginUtilityTree.walk(node => node.source = atRule.source)

      atRule.before(utilityTree)
      atRule.before(pluginUtilityTree)
    }

    atRule.remove()
  })
}
