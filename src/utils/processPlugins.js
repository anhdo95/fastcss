import postcss from 'postcss'
import Node from 'postcss/lib/node'
import get from 'lodash/get'
import parseObjectStyles from './parseObjectStyles'
import wrapWithVariants from './wrapWithVariants'
import generateVariantFunction from './generateVariantFunction'
import defaults from './defaults'
import prefixSelector from './prefixSelector'
import escapeSelector from './escapeSelector'

function parseStyles(styles) {
  if (!Array.isArray(styles)) {
    return parseStyles([styles])
  }

  return styles.flatMap((style) =>
    style instanceof Node ? style : parseObjectStyles(style)
  )
}

module.exports = function processPlugins(plugins, config) {
  const pluginBases = []
  const pluginComponents = []
  const pluginUtilities = []
  const pluginVariantGenerators = {}

  function theme(key, defaultValue) {
    return get(config, `theme.${key}`, defaultValue)
  }

  function variants(key) {
    return get(config, `variants.${key}`)
  }

  plugins.forEach((plugin) => {
    plugin({
      config,
      e: escapeSelector,
      theme,
      variants,

      addBase(base) {
        pluginBases.push(...parseStyles(base))
      },

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
            rule.selector = prefixSelector(config.prefix, rule.selector)
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

  return { pluginBases, pluginComponents, pluginUtilities, pluginVariantGenerators }
}
