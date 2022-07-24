import Node from 'postcss/lib/node'
import selectorParser from 'postcss-selector-parser'
import get from 'lodash/get'
import parseObjectStyles from './parseObjectStyles'
import defaults from './defaults'
import escapeSelector from './escapeSelector'

function parseStyles(styles) {
  if (!Array.isArray(styles)) {
    return parseStyles([styles])
  }

  return styles.flatMap((style) =>
    style instanceof Node ? style : parseObjectStyles(style)
  )
}

function getClasses(selector) {
  const classes = []
  const parser = selectorParser((selectors) => {
    selectors.walkClasses((c) => classes.push(c.value))
    return classes
  })
  return parser.transformSync(selector)
}

function extractCandidates(node) {
  const classes = node.type === 'rule' ? getClasses(node.selector) : []
  if (node.type === 'atrule') {
    node.walkRules((rule) => classes.push(...getClasses(rule.selector)))
  }
  return classes
}

function withIdentifiers(styles) {
  return parseStyles(styles).flatMap((node) => {
    const candidates = extractCandidates(node)
    return candidates.map((c) => [c, node])
  })
}

export default function buildPluginApi(config, context, { variantList, variantMap, offsets }) {
  function theme(key, defaultValue) {
    return get(config, `theme.${key}`, defaultValue)
  }

  function variants(key) {
    return get(config, `variants.${key}`)
  }

  function prefixIdentifier(identifier, options = {}) {
    if (identifier === '*') {
      return identifier
    }

    if (!options.respectPrefix) {
      return identifier
    }

    return config.prefix + identifier
  }

  return {
    config,
    e: escapeSelector,
    theme,
    variants,

    matchBase(base) {
      for (const identifier of base) {
        const prefixedIdentifier = prefixIdentifier(identifier)

        if (!context.candidateRuleCache.has(prefixedIdentifier)) {
          context.candidateRuleCache.set(prefixedIdentifier, [])
        }

        context.candidateRuleCache
          .get(prefixedIdentifier)
          .push([{ sort: offsets.base++, layer: 'base' }, rule])
      }
    },

    matchUtilities(utilities, opts = {}) {
      const defaultOpts = {
        respectPrefix: true,
        respectImportant: true,
        respectVariants: true,
        variants: [],
      }
      const options = Array.isArray(opts)
        ? { ...defaultOpts, variants: opts }
        : defaults(opts, defaultOpts)

      for (const identifier in utilities) {
        const prefixedIdentifier = prefixIdentifier(identifier, options)

        if (!context.candidateRuleCache.has(prefixedIdentifier)) {
          context.candidateRuleCache.set(prefixedIdentifier, [])
        }

        context.candidateRuleCache
          .get(prefixedIdentifier)
          .push([{ sort: offsets.utilities++, layer: 'utilities', options }, utilities[identifier]])
      }
    },

    addUtilities(utilities, opts = {}) {
      const defaultOpts = {
        respectPrefix: true,
        respectImportant: false,
        respectVariants: true,
        variants: [],
      }

      const options = Array.isArray(opts)
        ? { ...defaultOpts, variants: opts }
        : defaults(opts, defaultOpts)

      for (const [identifier, rule] of withIdentifiers(utilities)) {
        const prefixedIdentifier = prefixIdentifier(identifier, options)

        if (!context.candidateRuleCache.has(prefixedIdentifier)) {
          context.candidateRuleCache.set(prefixedIdentifier, [])
        }

        context.candidateRuleCache
          .get(prefixedIdentifier)
          .push([{ sort: offsets.utilities++, layer: 'utilities', options }, rule])
      }
    },

    addComponents(components, opts = {}) {
      const defaultOpts = {
        respectPrefix: true,
        respectImportant: false,
        respectVariants: true,
        variants: [],
      }

      const options = Array.isArray(opts)
        ? { ...defaultOpts, variants: opts }
        : defaults(opts, defaultOpts)

      for (const [identifier, rule] of withIdentifiers(components)) {
        const prefixedIdentifier = prefixIdentifier(identifier, options)

        if (!context.candidateRuleCache.has(prefixedIdentifier)) {
          context.candidateRuleCache.set(prefixedIdentifier, [])
        }

        context.candidateRuleCache
          .get(prefixedIdentifier)
          .push([{ sort: offsets.components++, layer: 'components', options }, rule])
      }
    },

    addVariant(name, generator) {
      variantList.push(name)
      variantMap.set(name, generator)
    },
  }
}
