module.exports = function textColors({ variants, values }) {
  return function ({ addUtilities }) {
    addUtilities(
      Object.keys(values).reduce((classes, color) => {
        return {
          ...classes,
          [`.text-${color}`]: {
            color: values[color],
          },
        }
      }, {}),
      variants
    )
  }
}
