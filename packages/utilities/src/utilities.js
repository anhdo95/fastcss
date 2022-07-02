const buildScreens = require('./screens')
const buildColors = require('./colors')
const substituteApplyAtRules = require('./applyAtRules')

module.exports = function utilitiesPlugin(root, { opts }) {
  root.walkAtRules('use', rule => {
    if (rule.params === 'utilities') {
      const screens = buildScreens(root, opts)
      const { textColors, bgColors, colorsInScreens } = buildColors(root, opts)

      root.insertBefore(rule, [
        ...screens,
        ...textColors,
        ...bgColors,
        ...colorsInScreens
      ])

      substituteApplyAtRules(root, opts)

      rule.remove()
    }
  })
}
