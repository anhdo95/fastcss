export default function () {
  return function height({ addUtilities, theme, variants, e }) {
    const values = theme('height')
    addUtilities(
      Object.keys(values).reduce((classes, size) => {
        return {
          ...classes,
          [`.h-${e(size)}`]: {
            height: values[size],
          },
          [`.min-h-${e(size)}`]: {
            'min-height': values[size],
          },
          [`.max-h-${e(size)}`]: {
            'max-height': values[size],
          },
        }
      }, {}),
      variants('height')
    )
  }
}
