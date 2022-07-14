const escapeSelector = require('../utils/escapeSelector')
const prefixNegativeModifier = require('../utils/prefixNegativeModifier')

module.exports = function () {
  return function margin({ addUtilities, theme, variants }) {
    const selector = (base, modifier) =>
      `.${escapeSelector(prefixNegativeModifier(base, modifier))}`
    const values = theme('margin')

    addUtilities(
      Object.keys(values).reduce((classes, size) => {
        return {
          ...classes,
          [selector('m', size)]: {
            margin: values[size],
          },
          [selector('mx', size)]: {
            'margin-left': values[size],
            'margin-right': values[size],
          },
          [selector('my', size)]: {
            'margin-top': values[size],
            'margin-bottom': values[size],
          },
        }
      }, {}),
      variants('margin')
    )
  }
}
