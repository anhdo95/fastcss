import withAlphaVariable from '../utils/withAlphaVariable'

export default function () {
  return function textColor({ addUtilities, theme, variants }) {
    const values = theme('textColor')
    addUtilities(
      Object.keys(values).reduce((classes, color) => {
        return {
          ...classes,
          [`.text-${color}`]: withAlphaVariable({
            color: values[color],
            property: 'color',
            variable: '--text-opacity',
          }),
        }
      }, {}),
      variants('textColor')
    )
  }
}
