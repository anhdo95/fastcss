const escapeSelector = require('../utils/escapeSelector')

module.exports = function spacing({
  addUtilities,
  config: { spacing, modules },
}) {
  addUtilities(
    Object.keys(spacing.common).reduce((classes, size) => {
      return {
        ...classes,
        [`.m-${escapeSelector(size)}`]: {
          margin: spacing.common[size],
        },
        [`.mx-${escapeSelector(size)}`]: {
          'margin-left': spacing.common[size],
          'margin-right': spacing.common[size],
        },
        [`.my-${escapeSelector(size)}`]: {
          'margin-top': spacing.common[size],
          'margin-bottom': spacing.common[size],
        },
        [`.p-${escapeSelector(size)}`]: {
          padding: spacing.common[size],
        },
        [`.px-${escapeSelector(size)}`]: {
          'padding-left': spacing.common[size],
          'padding-right': spacing.common[size],
        },
        [`.py-${escapeSelector(size)}`]: {
          'padding-top': spacing.common[size],
          'padding-bottom': spacing.common[size],
        },
      }
    }, {}),
    modules.spacing
  )
}
