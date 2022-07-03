const defineClasses = require('../libs/defineClasses')

module.exports = function spacing({ config: { spacing } }) {
  return defineClasses(
    Object.keys(spacing.common).reduce((classes, size) => {
      return {
        ...classes,
        [`m-${size}`]: {
          margin: spacing.common[size],
        },
        [`mx-${size}`]: {
          'margin-left': spacing.common[size],
          'margin-right': spacing.common[size],
        },
        [`my-${size}`]: {
          'margin-top': spacing.common[size],
          'margin-bottom': spacing.common[size],
        },
        [`p-${size}`]: {
          padding: spacing.common[size],
        },
        [`px-${size}`]: {
          'padding-left': spacing.common[size],
          'padding-right': spacing.common[size],
        },
        [`py-${size}`]: {
          'padding-top': spacing.common[size],
          'padding-bottom': spacing.common[size],
        },
      }
    }, {})
  )
}
