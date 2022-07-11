const defaults = require('./defaults')

function isFunction(fn) {
  return typeof fn === 'function'
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

function mergeWith(target, ...sources) {
  const customizer = sources.pop()

  for (const source of sources) {
    for (const k in source) {
      const merged = customizer(target[k], source[k], k)

      if (merged === undefined) {
        if (isObject(target[k]) && isObject(source[k])) {
          target[k] = mergeWith(target[k], source[k], customizer)
        }
      } else {
        target[k] = merged
      }
    }
  }

  return target
}

function mergeExtensions({ extend, ...theme }) {
  return mergeWith(theme, extend, (theme, extensions) => {
    if (isFunction(theme) || isFunction(extensions)) {
      return (mergedTheme) => ({
        ...(isFunction(theme) ? theme(mergedTheme) : theme),
        ...(isFunction(extensions) ? extensions(mergedTheme) : extensions),
      })
    }

    return {
      ...theme,
      ...extensions,
    }
  })
}

function resolveFunctionKeys(theme) {
  return Object.keys(theme).reduce(
    (resolved, key) => ({
      ...resolved,
      [key]: isFunction(theme[key]) ? theme[key](theme) : theme[key],
    }),
    {}
  )
}

module.exports = function resolveConfig(configs) {
  return defaults(
    {
      theme: resolveFunctionKeys(
        mergeExtensions(defaults(...configs.map(({ theme }) => theme)))
      ),
    },
    ...configs
  )
}
