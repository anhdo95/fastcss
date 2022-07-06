const postcss = require('postcss')

module.exports = function container({ addComponents, config }) {
  function createContainer(width) {
    return postcss
      .rule({
        selector: '.container',
      })
      .append(
        postcss.decl({
          prop: 'max-width',
          value: width,
        })
      )
  }

  const mediaRules = Object.keys(config.screens).map((screen) => {
    const width = config.screens[screen]

    return postcss
      .atRule({
        name: 'media',
        params: `(min-width: ${width})`,
      })
      .append(createContainer(width))
  })

  addComponents([
    createContainer('100%'),
    ...mediaRules
  ])
}
