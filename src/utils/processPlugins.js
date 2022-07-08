const postcss = require('postcss')
const Node = require('postcss/lib/node')
const parseObjectStyles = require('./parseObjectStyles')
const wrapWithVariants = require('./wrapWithVariants')
const generateVariantFunction = require('./generateVariantFunction')
const defaults = require('./defaults')
const prefixSelector = require('./prefixSelector')

function parseStyles(styles) {
  if (!Array.isArray(styles)) {
    return parseStyles([styles])
  }

  return styles.flatMap((style) =>
    style instanceof Node ? style : parseObjectStyles(style)
  )
}

module.exports = function processPlugins(plugins, config) {
  const pluginComponents = []
  const pluginUtilities = []
  const pluginVariantGenerators = {}

  plugins.forEach((plugin) => {
    plugin({
      config,
      addUtilities(utilities, opts = {}) {
        const defaultOpts = { respectPrefix: true, variants: [] }
        const options = Array.isArray(opts)
          ? { ...defaultOpts, variants: opts }
          : defaults(opts, defaultOpts)

        const styles = postcss.root({
          nodes: parseStyles(utilities),
        })

        if (options.respectPrefix) {
          styles.walkRules(rule => {
            rule.selector = prefixSelector(config.options.prefix, rule.selector)
          })
        }

        pluginUtilities.push(wrapWithVariants(options.variants, styles.nodes))
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
