const escapeSelector = require('../utils/escapeSelector')

module.exports = function width({ variants, values }) {
  return function ({ addUtilities }) {
    addUtilities(
      Object.keys(values).reduce((classes, size) => {
        return {
          ...classes,
          [`.w-${escapeSelector(size)}`]: {
            width: values[size],
          },
          [`.min-w-${escapeSelector(size)}`]: {
            'min-width': values[size],
          },
          [`.max-w-${escapeSelector(size)}`]: {
            'max-width': values[size],
          },
        }
      }, {}),
      variants
    )
  }
}
