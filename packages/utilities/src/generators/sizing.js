const defineClasses = require('../utils/defineClasses')

module.exports = function sizing({ sizing }) {
  return defineClasses(
    Object.keys(sizing.common).reduce((classes, size) => {
      return {
        ...classes,
        [`w-${size}`]: {
          width: sizing.common[size],
        },
        [`h-${size}`]: {
          height: sizing.common[size],
        },
        [`min-w-${size}`]: {
          'min-width': sizing.common[size],
        },
        [`min-h-${size}`]: {
          'min-height': sizing.common[size],
        },
        [`max-w-${size}`]: {
          'max-width': sizing.common[size],
        },
        [`max-h-${size}`]: {
          'max-height': sizing.common[size],
        },
      }
    }, {})
  )
}
