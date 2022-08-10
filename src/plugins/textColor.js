import withAlphaVariable from '../utils/withAlphaVariable'
import { nameClass, asValue } from './utils'

export default function textColor({ matchUtilities, theme }) {
  matchUtilities({
    text(modifier) {
      const value = asValue(modifier, theme('textColor'))

      if (value === undefined) {
        return []
      }

      return {
        [nameClass('text', modifier)]: withAlphaVariable({
          color: value,
          property: 'color',
          variable: '--fast-text-opacity',
        }),
      }
    },
  })
}
