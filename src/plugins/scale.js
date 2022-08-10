import { nameClass, asValue } from './utils'

export default function scale({ matchUtilities, theme }) {
  matchUtilities({
    scale(modifier) {
      const value = asValue(modifier, theme('scale'))

      if (value === undefined) {
        return []
      }

      return {
        [nameClass('scale', modifier)]: {
          '--fast-scale-x': value,
          '--fast-scale-y': value,
        },
      }
    },

    'scale-x'(modifier) {
      const value = asValue(modifier, theme('scale'))

      if (value === undefined) {
        return []
      }

      return {
        [nameClass('scale-x', modifier)]: {
          '--fast-scale-x': value,
        },
      }
    },

    'scale-y'(modifier) {
      const value = asValue(modifier, theme('scale'))

      if (value === undefined) {
        return []
      }

      return {
        [nameClass('scale-y', modifier)]: {
          '--fast-scale-y': value,
        },
      }
    },
  })
}
