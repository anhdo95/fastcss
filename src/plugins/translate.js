const prefixNegativeModifier = require('../utils/prefixNegativeModifier')

module.exports = function translate({ variants, values }) {
  return function ({ addUtilities, e }) {
    addUtilities(
      Object.keys(values).reduce((classes, size) => {
        return {
          ...classes,
          [`.${prefixNegativeModifier('translate-x', e(size))}`]: {
            '--transform-translate-x': values[size],
          },
          [`.${prefixNegativeModifier('translate-y', e(size))}`]: {
            '--transform-translate-y': values[size],
          },
        }
      }, {}),
      variants
    )
  }
}
