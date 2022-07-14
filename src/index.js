const fs = require('fs')
const postcss = require('postcss')
const postcssPresetEnv = require('postcss-preset-env')

const corePlugins = require('./core/plugins')
const resolveConfig = require('./utils/resolveConfig')
const processPlugins = require('./utils/processPlugins')
const useAtRule = require('./libs/useAtRule')
const evaluateFunctions = require('./libs/evaluateFunctions')
const applyAtRule = require('./libs/applyAtRule')
const variantsAtRule = require('./libs/variantsAtRule')
const responsiveAtRule = require('./libs/responsiveAtRule')

module.exports = postcss.plugin('fast', () => {
  function getConfig() {
    if (!fs.existsSync('./fast.config.js')) {
      return resolveConfig([require('./default.config.js')])
    }

    return resolveConfig([
      require('../fast.config.js'),
      require('./default.config.js'),
    ])
  }
  const config = getConfig()
  const plugins = processPlugins(
    [...corePlugins(config), ...config.plugins],
    config
  )

  return postcss([
    useAtRule(config, plugins),
    evaluateFunctions(config),
    variantsAtRule(config, plugins),
    responsiveAtRule(config),
    applyAtRule(config),
    postcssPresetEnv,
    function (root) {
      root.rawCache = {
        colon: ': ',
        indent: '  ',
        beforeDecl: '\n',
        beforeRule: '\n',
        beforeOpen: ' ',
        beforeClose: '\n',
        beforeComment: '\n',
        after: '\n',
        emptyBody: '',
        commentLeft: ' ',
        commentRight: ' ',
        semicolon: false,
      }
    },
  ])
})
