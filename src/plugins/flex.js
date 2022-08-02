import { nameClass, asValue } from './utils'

export default function flex({ matchUtilities, theme }) {
  matchUtilities({
    flex(modifier) {
      const value = asValue(modifier, theme('flex'))

      if (value === undefined) {
        return []
      }

      return {
        [nameClass('flex', modifier)]: {
          flex: value,
        },
      }
    },
  })
}
