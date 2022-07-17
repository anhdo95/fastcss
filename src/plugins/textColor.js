export default function () {
  return function textColor({ addUtilities, theme, variants }) {
    const values = theme('textColor')
    addUtilities(
      Object.keys(values).reduce((classes, color) => {
        return {
          ...classes,
          [`.text-${color}`]: {
            color: values[color],
          },
        }
      }, {}),
      variants('textColor')
    )
  }
}
