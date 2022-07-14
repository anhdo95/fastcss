const preflight = require('../plugins/preflight')
const container = require('../plugins/container')
const display = require('../plugins/display')
const flex = require('../plugins/flex')
const textColors = require('../plugins/textColors')
const backgroundColors = require('../plugins/backgroundColors')
const width = require('../plugins/width')
const height = require('../plugins/height')
const margin = require('../plugins/margin')
const padding = require('../plugins/padding')
const transform = require('../plugins/transform')
const translate = require('../plugins/translate')
const rotate = require('../plugins/rotate')
const scale = require('../plugins/scale')

function loadPlugins({ corePlugins }, plugins) {
  return Object.keys(plugins)
    .filter((pluginName) => corePlugins[pluginName] !== false)
    .map((pluginName) => {
      return plugins[pluginName]()
    })
}

module.exports = function plugins(config) {
  return loadPlugins(config, {
    preflight,
    container,
    textColors,
    backgroundColors,
    display,
    flex,
    width,
    height,
    margin,
    padding,
    transform,
    translate,
    rotate,
    scale,
  })
}
