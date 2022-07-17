import postcss from 'postcss'
import defineClass from '../utils/defineClass'

export default function () {
  return function container({ addComponents, theme }) {
    function defineContainer(width) {
      return defineClass('container', {
        'max-width': width,
      })
    }

    const mediaRules = Object.values(theme('screens'))
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map(width => {
        return postcss
          .atRule({
            name: 'media',
            params: `(min-width: ${width})`,
          })
          .append(defineContainer(width))
      })

    addComponents([defineContainer('100%'), ...mediaRules])
  }
}
