import { nameClass, asValue } from './utils'

export default function divideWidth({ matchUtilities, theme }) {
  matchUtilities({
    'divide-x'(modifier) {
      if (modifier === 'DEFAULT') {
        return []
      }

      const value = asValue(modifier, theme('divideWidth'))

      if (value === undefined) {
        return []
      }

      return {
        [`${nameClass(
          'divide-x',
          modifier
        )} > :not([hidden]) ~ :not([hidden])`]: {
          '--divide-x-reverse': '0',
          'border-left-width': `calc(${value} * (1 - var(--divide-x-reverse)))`,
          'border-right-width': `calc(${value} * var(--divide-x-reverse))`,
        },
      }
    },

    'divide-y'(modifier) {
      if (modifier === 'DEFAULT') {
        return []
      }

      const value = asValue(modifier, theme('divideWidth'))

      if (value === undefined) {
        return []
      }

      return {
        [`${nameClass(
          'divide-y',
          modifier
        )} > :not([hidden]) ~ :not([hidden])`]: {
          '--divide-y-reverse': '0',
          'border-top-width': `calc(${values[size]} * (1 - var(--divide-y-reverse)))`,
          'border-bottom-width': `calc(${values[size]} * var(--divide-y-reverse))`,
        },
      }
    },
  })

  matchUtilities({
    '.divide-x-reverse > :not([hidden]) ~ :not([hidden])': {
      '--divide-x-reverse': '1',
    },
    '.divide-y-reverse > :not([hidden]) ~ :not([hidden])': {
      '--divide-y-reverse': '1',
    },
  })
}
