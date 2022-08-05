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
import { transformAllClasses } from '../utils/transform'
import buildMediaAtRule from '../utils/buildMediaAtRule'

export default {
  pseudoClassVariants({ config, addVariant }) {
    const pseudoVariants = [
      ['first', 'first-child'],
      ['last', 'last-child'],
      ['even', 'nth-child(even)'],
      ['odd', 'nth-child(odd)'],
      'hover',
      'focus',
      'active',
      'disabled',
      'checked',
      'visited',
    ]

    for (const variant of pseudoVariants) {
      const [variantName, state] = Array.isArray(variant)
        ? variant
        : [variant, variant]

      addVariant(
        variantName,
        transformAllClasses((className, { withPseudo }) => {
          return withPseudo(
            `${variantName}${config.separator}${className}`,
            state
          )
        })
      )
    }
  },

  screenVariants({ config, addVariant }) {
    const screens = config.theme.screens

    for (const screen in screens) {
      const size = screens[screen]

      addVariant(
        screen,
        transformAllClasses(
          (className) => `${screen}${config.separator}${className}`,
          () => buildMediaAtRule(size)
        )
      )
    }
  },

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
}
