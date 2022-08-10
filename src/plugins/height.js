import { nameClass, asValue } from './utils'

export default function height({ matchUtilities, theme }) {
  matchUtilities({
    h(modifier) {
      const value = asValue(modifier, theme('height'))

      if (value === undefined) {
        return []
      }

      return {
        [nameClass('h', modifier)]: {
          height: value,
        },
      }
    },
  })
}
