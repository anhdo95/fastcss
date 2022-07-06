const defineClasses = require('../utils/defineClasses')

module.exports = function backgroundColors({ colors }) {
  return defineClasses(
    Object.keys(colors).reduce((classes, color) => {
      return {
        ...classes,
        [`bg-${color}`]: {
          'background-color': colors[color],
        },
      }
    }, {})
  )
}
