const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const generateModules = require('../utils/generateModules')

module.exports = function utilitiesAtRule(root, { opts }) {
  root.walkAtRules('use', atRule => {
    if (atRule.params === 'preflight') {
      const preflightPath = path.resolve(__dirname, '../../css/preflight.css')
      const css = postcss.parse(fs.readFileSync(preflightPath, 'utf-8'))
      atRule.before(css)
    }

    if (atRule.params === 'utilities') {
      const utilities = generateModules(opts.config)

      utilities.walk(node => node.source = atRule.source)

      atRule.before(utilities)
    }

    atRule.remove()
  })
}
