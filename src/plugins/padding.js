const escapeSelector = require('../utils/escapeSelector')

module.exports = function () {
  return function padding({ addUtilities, theme, variants }) {
    const values = theme('padding')
    addUtilities(
      Object.keys(values).reduce((classes, size) => {
        return {
          ...classes,
          [`.p-${escapeSelector(size)}`]: {
            padding: values[size],
          },
          [`.px-${escapeSelector(size)}`]: {
            'padding-left': values[size],
            'padding-right': values[size],
          },
          [`.py-${escapeSelector(size)}`]: {
            'padding-top': values[size],
            'padding-bottom': values[size],
          },
        }
      }, {}),
      variants('padding')
    )
  }
}
