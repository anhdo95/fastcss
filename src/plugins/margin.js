import { nameClass, asValue } from './utils'

export default function margin({ matchUtilities, theme }) {
  matchUtilities({
    m(modifier) {
      const value = asValue(modifier, theme('margin'))

      if (value === undefined) {
        return []
      }

      return {
        [nameClass('m', modifier)]: {
          margin: value,
        },
      }
    },

    mx(modifier) {
      const value = asValue(modifier, theme('margin'))

      if (value === undefined) {
        return []
      }

      return {
        [nameClass('mx', modifier)]: {
          'margin-left': value,
          'margin-right': value,
        },
      }
    },

    my(modifier) {
      const value = asValue(modifier, theme('margin'))

      if (value === undefined) {
        return []
      }

      return {
        [nameClass('my', modifier)]: {
          'margin-top': value,
          'margin-bottom': value,
        },
      }
    },
  })
}
