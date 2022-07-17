export default function () {
  return function backgroundColor({ addUtilities, theme, variants }) {
    const values = theme('backgroundColor')
    addUtilities(
      Object.keys(values).reduce((classes, color) => {
        return {
          ...classes,
          [`.bg-${color}`]: {
            'background-color': values[color],
          },
        }
      }, {}),
      variants('backgroundColor')
    )
  }
}
