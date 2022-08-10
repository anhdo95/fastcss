import { nameClass, asValue } from './utils'

export default function divideColor({ matchUtilities, theme }) {
  matchUtilities({
    divide(modifier) {
      if (modifier === 'DEFAULT') {
        return []
      }

      const value = asValue(modifier, theme('divideColor'))

      if (value === undefined) {
        return []
      }

      return {
        [`${nameClass('divide', modifier)} > :not([hidden]) ~ :not([hidden])`]: {
          'border-color': value
        },
      }
    },
  })
}
