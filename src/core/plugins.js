import preflight from '../plugins/preflight'
import container from '../plugins/container'
import display from '../plugins/display'
import flex from '../plugins/flex'
import textColor from '../plugins/textColor'
import textOpacity from '../plugins/textOpacity'
import backgroundColor from '../plugins/backgroundColor'
import backgroundOpacity from '../plugins/backgroundOpacity'
import width from '../plugins/width'
import height from '../plugins/height'
import margin from '../plugins/margin'
import padding from '../plugins/padding'
import borderWidth from '../plugins/borderWidth'
import borderColor from '../plugins/borderColor'
import divideWidth from '../plugins/divideWidth'
import divideColor from '../plugins/divideColor'
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

export default function plugins(config) {
  return loadPlugins(config, {
    preflight,
    container,
    textColor,
    textOpacity,
    backgroundColor,
    backgroundOpacity,
    display,
    flex,
    width,
    height,
    margin,
    padding,
    borderWidth,
    borderColor,
    divideWidth,
    divideColor,
    transform,
    translate,
    rotate,
    scale,
  })
}
