const escapeSelector = require('../utils/escapeSelector')

module.exports = function sizing({
  addUtilities,
  config: { sizing, modules },
}) {
  addUtilities(
    Object.keys(sizing.common).reduce((classes, size) => {
      return {
        ...classes,
        [`.w-${escapeSelector(size)}`]: {
          width: sizing.common[size],
        },
        [`.h-${escapeSelector(size)}`]: {
          height: sizing.common[size],
        },
        [`.min-w-${escapeSelector(size)}`]: {
          'min-width': sizing.common[size],
        },
        [`.min-h-${escapeSelector(size)}`]: {
          'min-height': sizing.common[size],
        },
        [`.max-w-${escapeSelector(size)}`]: {
          'max-width': sizing.common[size],
        },
        [`.max-h-${escapeSelector(size)}`]: {
          'max-height': sizing.common[size],
        },
      }
    }, {}),
    modules.sizing
  )
}
