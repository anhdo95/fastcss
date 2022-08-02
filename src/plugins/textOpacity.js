import { nameClass, asValue } from './utils'

export default function textOpacity({ matchUtilities }) {
  matchUtilities({
    'text-opacity'(modifier) {
      const value = asValue(modifier, theme('textOpacity'))

      if (value === undefined) {
        return []
      }

      return {
        [nameClass('text-opacity', modifier)]: {
          '--fast-text-opacity': value,
        },
      }
    },
  })
}
