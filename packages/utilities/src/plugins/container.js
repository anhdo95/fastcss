const postcss = require('postcss')
const defineClass = require('../utils/defineClass')

module.exports = function container({ addComponents, config }) {
  function defineContainer(width) {
    return defineClass('container', {
      'max-width': width,
    })
  }

  const mediaRules = Object.keys(config.screens).map((screen) => {
    const width = config.screens[screen]

    return postcss
      .atRule({
        name: 'media',
        params: `(min-width: ${width})`,
      })
      .append(defineContainer(width))
  })

  addComponents([defineContainer('100%'), ...mediaRules])
}
