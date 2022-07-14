const escapeSelector = require('../utils/escapeSelector')

module.exports = function () {
  return function width({ addUtilities, theme, variants }) {
    const values = theme('width')
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
      variants('width')
    )
  }
}
