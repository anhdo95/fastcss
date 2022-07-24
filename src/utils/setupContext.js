import fs from 'fs'
import path from 'path'
import hash from 'object-hash'
import resolveConfig from './resolveConfig'

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

export default function setupContext(configPath) {
  return (root, result) => {
    const [fastConfig, userConfigPath, fastConfigHash] =
      getFastConfig(configPath)

    console.log('fastConfig :>> ', fastConfig)
    console.log('userConfigPath :>> ', userConfigPath)
    console.log('fastConfigHash :>> ', fastConfigHash)
  }
}
