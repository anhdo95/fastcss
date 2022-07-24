import fs from 'fs'
import path from 'path'
import hash from 'object-hash'
import resolveConfig from './resolveConfig'

const contextCache = new Map()
const configContextCache = new Map()

function resolveConfigPath(configPath) {
  // require('fastcss')('custom-config.js')
  if (typeof configPath === 'string') {
    return path.resolve(configPath)
  }

  try {
    const defaultConfigPath = path.resolve('./fast.config.js')
    fs.accessSync(defaultConfigPath)
    return defaultConfigPath
  } catch (error) {}

  return null
}

const configPathCache = new Map()

function getFastConfig(configPath) {
  const userConfigPath = resolveConfigPath(configPath)

  if (userConfigPath !== null) {
    const [prevConfig, prevModifiedTime = -Infinity, prevConfigHash] =
      configPathCache.get(userConfigPath) || []
    const modifiedTime = fs.statSync(userConfigPath).mtimeMs

    if (modifiedTime <= prevModifiedTime) {
      return [prevConfig, userConfigPath, prevConfigHash]
    }

    // It's changed (based on timestamp) or first run
    delete require.cache[require.resolve(userConfigPath)]
    const newConfig = resolveConfig(require(userConfigPath))
    const newHash = hash(newConfig)

    configPathCache.set(userConfigPath, [newConfig, modifiedTime, newHash])
    return [newConfig, userConfigPath, newHash]
  }

  const defaultConfig = resolveConfig()
  return [defaultConfig, null, hash(defaultConfig)]
}

const pathModifiedCache = new Map()

function trackModified(paths) {
  let modified = false

  for (const path of paths) {
    const modifiedTime = fs.statSync(path).mtimeMs

    if (!pathModifiedCache.has(path) || pathModifiedCache.get(path) < modifiedTime) {
      modified = true
    }

    pathModifiedCache.set(path, modifiedTime)
  }

  return modified
}

export default function setupContext(configPath) {
  return (root, result) => {
    const [fastConfig, userConfigPath, fastConfigHash] =
      getFastConfig(configPath)
    const isConfigFile = userConfigPath !== null
    const contextDependencies = new Set()
    const sourcePath = result.opts.from

    if (isConfigFile) {
      contextDependencies.add(userConfigPath)
    }

    let foundFast = false
    root.walkAtRules('fast', () => {
      foundFast = true
    })

    if (foundFast) {
      contextDependencies.add(sourcePath)
    }

    const contextDependenciesChanged = trackModified([...contextDependencies])

    if (!contextDependenciesChanged) {
      if (contextCache.has(sourcePath)) {
        return contextCache.get(sourcePath)
      }
      if (configContextCache.has(fastConfigHash)) {
        return configContextCache.get(fastConfigHash)
      }
    }
  }
}
