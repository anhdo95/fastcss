const postcss = require('postcss')
const defineClass = require('../utils/defineClass')

module.exports = function container() {
  return function ({ addComponents, config }) {
    function defineContainer(width) {
      return defineClass('container', {
        'max-width': width,
      })
    }

    const mediaRules = Object.keys(config.theme.screens).map((screen) => {
      const width = config.theme.screens[screen]

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
