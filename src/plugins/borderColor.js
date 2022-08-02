import withAlphaVariable from '../utils/withAlphaVariable'
import { nameClass, asValue } from './utils'

export default function borderColor({ matchUtilities, theme }) {
  matchUtilities({
    border(modifier) {
      if (modifier === 'DEFAULT') {
        return []
      }

      const value = asValue(modifier, theme('borderColor'))

      if (value === undefined) {
        return []
      }

      return {
        [nameClass('border', modifier)]: withAlphaVariable({
          color: value,
          property: 'border-color',
          variable: '--fast-border-opacity',
        }),
      }
    },
  })
}
