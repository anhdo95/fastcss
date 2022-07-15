import preflight from '../plugins/preflight'
import container from '../plugins/container'
import display from '../plugins/display'
import flex from '../plugins/flex'
import textColors from '../plugins/textColors'
import backgroundColors from '../plugins/backgroundColors'
import width from '../plugins/width'
import height from '../plugins/height'
import margin from '../plugins/margin'
import padding from '../plugins/padding'
import transform from '../plugins/transform'
import translate from '../plugins/translate'
import rotate from '../plugins/rotate'
import scale from '../plugins/scale'

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
