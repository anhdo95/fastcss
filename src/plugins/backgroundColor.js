import withAlphaVariable from '../utils/withAlphaVariable'
import { nameClass, asValue } from './utils'

export default function backgroundColor({ matchUtilities, theme }) {
  matchUtilities({
    bg(modifier) {
      const value = asValue(modifier, theme('backgroundColor'))

      if (value === undefined) {
        return []
      }

      return {
        [nameClass('bg', modifier)]: withAlphaVariable({
          color: value,
          property: 'background-color',
          variable: '--fast-bg-opacity',
        }),
      }
    },
  })
}
