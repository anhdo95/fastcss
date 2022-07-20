import withAlphaVariable from '../utils/withAlphaVariable'

export default function () {
  return function backgroundColor({ addUtilities, theme, variants }) {
    const values = theme('backgroundColor')
    addUtilities(
      Object.keys(values).reduce((classes, color) => {
        return {
          ...classes,
          [`.bg-${color}`]: withAlphaVariable({
            color: values[color],
            property: 'background-color',
            variable: '--bg-opacity',
          }),
        }
      }, {}),
      variants('backgroundColor')
    )
  }
}
