import { isFunction, isObject } from '.'
import defaults from './defaults'
import toPath from './toPath'
import defaultConfig from '../../stubs/default.config'

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
      [key]: isFunction(theme[key])
        ? theme[key](resolveThemePath, utils)
        : theme[key],
    }),
    {}
  )
}

export default function resolveConfig(config = {}) {
  const allConfigs = [config, defaultConfig]

  return defaults(
    {
      theme: resolveFunctionKeys(
        mergeExtensions(defaults({}, ...allConfigs.map(({ theme }) => theme)))
      ),
      variants: defaults({}, ...allConfigs.map(({ variants }) => variants)),
    },
    ...allConfigs
  )
}
