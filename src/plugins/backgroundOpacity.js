import { asValue, nameClass } from './utils'

export default function backgroundOpacity({ matchUtilities, theme }) {
  matchUtilities({
    'bg-opacity'(modifier) {
      const value = asValue(modifier, theme('backgroundOpacity'))

      if (value === undefined) {
        return []
      }

      return {
        [nameClass('bg-opacity', modifier)]: {
          '--fast-bg-opacity': value,
        },
      }
    },
  })
}
