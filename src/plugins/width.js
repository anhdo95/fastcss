import { nameClass, asValue } from './utils'

export default function width({ matchUtilities, theme }) {
  matchUtilities({
    w(modifier) {
      const value = asValue(modifier, theme('width'))

      if (value === undefined) {
        return []
      }

      return {
        [nameClass('w', modifier)]: {
          width: value,
        },
      }
    },
  })
}
