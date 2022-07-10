module.exports = function backgroundColors({ values, variants }) {
  return function ({ addUtilities }) {
    addUtilities(
      Object.keys(values).reduce((classes, color) => {
        return {
          ...classes,
          [`.bg-${color}`]: {
            'background-color': values[color],
          },
        }
      }, {}),
      variants
    )
  }
}
