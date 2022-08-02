import { nameClass, asValue } from './utils'

export default function rotate({ matchUtilities, theme }) {
  matchUtilities({
    rotate(modifier) {
      const value = asValue(modifier, theme('rotate'))

      if (value === undefined) {
        return []
      }

      return {
        [nameClass('rotate', modifier)]: {
          '--fast-rotate': value,
        },
      }
    },
  })
}
