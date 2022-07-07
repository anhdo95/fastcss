const postcss = require('postcss')
const Node = require('postcss/lib/node')
const parseObjectStyles = require('./parseObjectStyles')
const wrapWithVariants = require('./wrapWithVariants')
const generateVariantFunction = require('./generateVariantFunction')
const defaults = require('./defaults')

function parseStyles(styles) {
  if (!Array.isArray(styles)) {
    return parseStyles([styles])
  }

  return styles.flatMap((style) =>
    style instanceof Node ? style : parseObjectStyles(style)
  )
}

module.exports = function processPlugins(config) {
  const pluginComponents = []
  const pluginUtilities = []
  const pluginVariantGenerators = {}

  config.plugins.forEach((plugin) => {
    plugin({
      config,
      addUtilities(utilities, opts = {}) {
        const defaultOpts = { variants: [] }
        defaults(opts, defaultOpts)

        const styles = postcss.root({
          nodes: parseStyles(utilities),
        })

        pluginUtilities.push(wrapWithVariants(opts.variants, styles.nodes))
      },

      addComponents(components) {
        const styles = postcss.root({
          nodes: parseStyles(components),
        })
        pluginComponents.push(styles)
      },

      addVariant(name, generator) {
        pluginVariantGenerators[name] = generateVariantFunction(generator)
      },
    })
  })

  return { pluginComponents, pluginUtilities, pluginVariantGenerators }
}
