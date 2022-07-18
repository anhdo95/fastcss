import fs from 'fs'
import path from 'path'
import postcssPresetEnv from 'postcss-preset-env'

import corePlugins from './core/plugins'
import registerConfigAsDependency from './utils/registerConfigAsDependency'
import resolveConfig from './utils/resolveConfig'
import processPlugins from './utils/processPlugins'
import useAtRule from './libs/useAtRule'
import evaluateFunctions from './libs/evaluateFunctions'
import applyAtRule from './libs/applyAtRule'
import variantsAtRule from './libs/variantsAtRule'
import responsiveAtRule from './libs/responsiveAtRule'
import formatNodes from './libs/formatCSS'

module.exports = () => {
  function resolveConfigPath() {
    try {
      const defaultConfigPath = path.resolve('./fast.config.js')
      fs.accessSync(defaultConfigPath)
      return defaultConfigPath
    } catch (error) {
      return undefined
    }
  }

  function getConfig(configPath) {
    if (!configPath) {
      return resolveConfig([require('./default.config.js')])
    }

    return resolveConfig([
      require(configPath),
      require('./default.config.js'),
    ])
  }

  const plugins = []
  const resolvedConfigPath = resolveConfigPath()

  if (resolvedConfigPath) {
    plugins.push(registerConfigAsDependency(resolvedConfigPath))
  }

  const config = getConfig(resolvedConfigPath)
  const processedPlugins = processPlugins(
    [...corePlugins(config), ...config.plugins],
    config
  )

  return {
    postcssPlugin: 'fastcss',
    plugins: [
      ...plugins,
      useAtRule(config, processedPlugins),
      evaluateFunctions(config),
      variantsAtRule(config, processedPlugins),
      responsiveAtRule(config),
      applyAtRule(config),
      formatNodes,
      postcssPresetEnv,
    ],
  }
}

module.exports.postcss = true
