import { nameClass, asValue } from './utils'

export default function translate({ matchUtilities, theme }) {
  matchUtilities({
    translate(modifier) {
      const value = asValue(modifier, theme('translate'))

      if (value === undefined) {
        return []
      }

      return {
        [nameClass('translate', modifier)]: {
          '--fast-translate-x': value,
          '--fast-translate-y': value,
        },
      }
    },

    'translate-x'(modifier) {
      const value = asValue(modifier, theme('translate'))

      if (value === undefined) {
        return []
      }

      return {
        [nameClass('translate-x', modifier)]: {
          '--fast-translate-x': value,
        },
      }
    },

    'translate-y'(modifier) {
      const value = asValue(modifier, theme('translate'))

      if (value === undefined) {
        return []
      }

      return {
        [nameClass('translate-y', modifier)]: {
          '--fast-translate-y': value,
        },
      }
    },
  })
}
