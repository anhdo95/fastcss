const defineClasses = require('../libs/defineClasses')

module.exports = function sizing({ config: { sizing } }) {
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
          width: sizing.common[size],
        },
        [`min-h-${size}`]: {
          height: sizing.common[size],
        },
        [`max-w-${size}`]: {
          width: sizing.common[size],
        },
        [`max-h-${size}`]: {
          height: sizing.common[size],
        },
      }
    }, {})
  )
}
