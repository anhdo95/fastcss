import defaults from './defaults'
import toPath from './toPath'

const utils = {
  negative(scale) {
    return Object.keys(scale)
      .filter((key) => scale[key] != '0')
      .reduce(
        (negativeScale, key) => ({
          ...negativeScale,
          [`-${key}`]: `-${scale[key]}`,
        }),
        {}
      )
  },
}

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
  function resolveThemePath(key, defaultValue) {
    const paths = toPath(key)

    let index = 0
    let val = theme

    while (val !== undefined && val !== null && index < paths.length) {
      val = val[paths[index++]]
      val = isFunction(val) ? val(resolveThemePath, utils) : val
    }

    return val === undefined ? defaultValue : val
  }

  return Object.keys(theme).reduce(
    (resolved, key) => ({
      ...resolved,
      [key]: isFunction(theme[key]) ? theme[key](resolveThemePath, utils) : theme[key],
    }),
    {}
  )
}

module.exports = function resolveConfig(configs) {
  return defaults(
    {
      theme: resolveFunctionKeys(
        mergeExtensions(defaults({}, ...configs.map(({ theme }) => theme)))
      ),
      variants: defaults({}, ...configs.map(({ variants }) => variants)),
    },
    ...configs
  )
}
