const postcss = require('postcss')
const postcssJs = require('postcss-js')

module.exports = function parseObjectStyles(styles) {
  if (!Array.isArray(styles)) {
    return parseObjectStyles([styles])
  }

  return styles.flatMap(
    (style) => postcss().process(style, { parser: postcssJs }).root.nodes
  )
}
