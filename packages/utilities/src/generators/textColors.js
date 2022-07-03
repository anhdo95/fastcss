const defineClasses = require('../libs/defineClasses')

module.exports = function textColors({ config: { colors } }) {
  return defineClasses(
    Object.keys(colors).reduce((classes, color) => {
      return {
        ...classes,
        [`text-${color}`]: {
          color: colors[color],
        },
      }
    }, {})
  )
}
