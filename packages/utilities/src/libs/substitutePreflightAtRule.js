const postcss = require('postcss')
const fs = require('fs')
const path = require('path')

module.exports = function substitutePreflight(root) {
  root.walkAtRules('use', (atRule) => {
    if (atRule.params === 'preflight') {
      const preflightPath = path.resolve(__dirname, '../../css/preflight.css')
      const css = postcss.parse(fs.readFileSync(preflightPath, 'utf-8'))
      atRule.before(css)
      atRule.remove()
    }
  })
}
