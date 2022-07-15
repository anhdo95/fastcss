export default function () {
  return function backgroundColors({ addUtilities, theme, variants }) {
    const values = theme('backgroundColors')
    addUtilities(
      Object.keys(values).reduce((classes, color) => {
        return {
          ...classes,
          [`.bg-${color}`]: {
            'background-color': values[color],
          },
        }
      }, {}),
      variants('backgroundColors')
    )
  }
}
