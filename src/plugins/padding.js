import { nameClass, asValue } from './utils'

export default function padding({ matchUtilities, theme }) {
  matchUtilities({
    p(modifier) {
      const value = asValue(modifier, theme('padding'))

      if (value === undefined) {
        return []
      }

      return {
        [nameClass('p', modifier)]: {
          padding: value,
        },
      }
    },

    px(modifier) {
      const value = asValue(modifier, theme('padding'))

      if (value === undefined) {
        return []
      }

      return {
        [nameClass('px', modifier)]: {
          'padding-left': value,
          'padding-right': value,
        },
      }
    },

    py(modifier) {
      const value = asValue(modifier, theme('padding'))

      if (value === undefined) {
        return []
      }

      return {
        [nameClass('py', modifier)]: {
          'padding-top': value,
          'padding-bottom': value,
        },
      }
    },
  })
}
