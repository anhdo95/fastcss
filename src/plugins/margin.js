const escapeSelector = require('../utils/escapeSelector')

module.exports = function margin({ variants, values }) {
  return function ({ addUtilities }) {
    addUtilities(
      Object.keys(values).reduce((classes, size) => {
        return {
          ...classes,
          [`.m-${escapeSelector(size)}`]: {
            margin: values[size],
          },
          [`.mx-${escapeSelector(size)}`]: {
            'margin-left': values[size],
            'margin-right': values[size],
          },
          [`.my-${escapeSelector(size)}`]: {
            'margin-top': values[size],
            'margin-bottom': values[size],
          },
        }
      }, {}),
      variants
    )
  }
}
