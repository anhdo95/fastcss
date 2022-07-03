const responsive = require('../directives/responsive')
const flex = require('../generators/flex')
const textColors = require('../generators/textColors')
const backgroundColors = require('../generators/backgroundColors')

module.exports = function generateUtilities(root, opts) {
  root.walkAtRules('use', atRule => {
    if (atRule.params === 'utilities') {
      const utilities = [
        flex(opts),
        textColors(opts),
        backgroundColors(opts),
      ].flat()

      atRule.before(responsive(utilities))
      atRule.remove()
    }
  })
}
