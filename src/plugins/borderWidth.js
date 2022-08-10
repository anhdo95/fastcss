import { nameClass, asValue } from './utils'

export default function borderWidth({ matchUtilities, theme }) {
  const borders = [
    ['border', 'border-width'],
    ['border-t', 'border-top-width'],
    ['border-b', 'border-bottom-width'],
    ['border-l', 'border-left-width'],
    ['border-r', 'border-right-width'],
  ]

  matchUtilities(
    borders.reduce((plugins, [prefix, property]) => {
      plugins[prefix] = (modifier) => {
        const value = asValue(modifier, theme('borderWidth'))

        if (value === undefined) {
          return []
        }

        return {
          [nameClass(prefix, modifier)]: {
            [property]: value,
          },
        }
      }

      return plugins
    }, {})
  )
}
