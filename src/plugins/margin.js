import prefixNegativeModifier from '../utils/prefixNegativeModifier'

export default function () {
  return function margin({ addUtilities, theme, variants, e }) {
    const selector = (base, modifier) =>
      `.${e(prefixNegativeModifier(base, modifier))}`
    const values = theme('margin')

    addUtilities(
      Object.keys(values).reduce((classes, size) => {
        return {
          ...classes,
          [selector('m', size)]: {
            margin: values[size],
          },
          [selector('mx', size)]: {
            'margin-left': values[size],
            'margin-right': values[size],
          },
          [selector('ml', size)]: {
            'margin-left': values[size],
          },
          [selector('mr', size)]: {
            'margin-right': values[size],
          },
          [selector('my', size)]: {
            'margin-top': values[size],
            'margin-bottom': values[size],
          },
          [selector('mt', size)]: {
            'margin-top': values[size],
          },
          [selector('mb', size)]: {
            'margin-bottom': values[size],
          },
        }
      }, {}),
      variants('margin')
    )
  }
}
