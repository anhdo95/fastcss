const escapeSelector = require('../utils/escapeSelector')

module.exports = function height({ variants, values }) {
  return function ({ addUtilities }) {
    addUtilities(
      Object.keys(values).reduce((classes, size) => {
        return {
          ...classes,
          [`.h-${escapeSelector(size)}`]: {
            height: values[size],
          },
          [`.min-h-${escapeSelector(size)}`]: {
            'min-height': values[size],
          },
          [`.max-h-${escapeSelector(size)}`]: {
            'max-height': values[size],
          },
        }
      }, {}),
      variants
    )
  }
}
