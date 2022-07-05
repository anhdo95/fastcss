const defineClasses = require('../utils/defineClasses')

module.exports = function textColors({ colors }) {
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
