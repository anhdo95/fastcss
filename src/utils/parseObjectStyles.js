import postcss from 'postcss'
import postcssJs from 'postcss-js'

module.exports = function parseObjectStyles(styles) {
  if (!Array.isArray(styles)) {
    return parseObjectStyles([styles])
  }

  return styles.flatMap(
    (style) => postcss().process(style, { parser: postcssJs }).root.nodes
  )
}
