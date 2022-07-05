const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const responsive = require('../directives/responsive')
const flex = require('../generators/flex')
const textColors = require('../generators/textColors')
const backgroundColors = require('../generators/backgroundColors')
const sizing = require('../generators/sizing')
const spacing = require('../generators/spacing')

module.exports = function utilitiesAtRule(root, { opts }) {
  root.walkAtRules('use', atRule => {
    if (atRule.params === 'preflight') {
      const preflightPath = path.resolve(__dirname, '../../css/preflight.css')
      const css = postcss.parse(fs.readFileSync(preflightPath, 'utf-8'))
      atRule.before(css)
    }

    if (atRule.params === 'utilities') {
      const utilities = [
        flex(opts),
        textColors(opts),
        backgroundColors(opts),
        sizing(opts),
        spacing(opts),
      ].flat()

      atRule.before(responsive(utilities))
    }

    atRule.remove()
  })
}
