module.exports = function () {
  return function padding({ addUtilities, theme, variants, e }) {
    const values = theme('padding')
    addUtilities(
      Object.keys(values).reduce((classes, size) => {
        return {
          ...classes,
          [`.p-${e(size)}`]: {
            padding: values[size],
          },
          [`.px-${e(size)}`]: {
            'padding-left': values[size],
            'padding-right': values[size],
          },
          [`.py-${e(size)}`]: {
            'padding-top': values[size],
            'padding-bottom': values[size],
          },
        }
      }, {}),
      variants('padding')
    )
  }
}
