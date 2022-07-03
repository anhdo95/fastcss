const defineClasses = require('../libs/defineClasses')

module.exports = function backgroundColors({ config: { colors } }) {
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
