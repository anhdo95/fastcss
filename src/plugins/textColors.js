export default function () {
  return function textColors({ addUtilities, theme, variants }) {
    const values = theme('textColors')
    addUtilities(
      Object.keys(values).reduce((classes, color) => {
        return {
          ...classes,
          [`.text-${color}`]: {
            color: values[color],
          },
        }
      }, {}),
      variants('textColors')
    )
  }
}
