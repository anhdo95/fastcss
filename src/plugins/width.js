export default function () {
  return function width({ addUtilities, theme, variants, e }) {
    const values = theme('width')
    addUtilities(
      Object.keys(values).reduce((classes, size) => {
        return {
          ...classes,
          [`.w-${e(size)}`]: {
            width: values[size],
          },
          [`.min-w-${e(size)}`]: {
            'min-width': values[size],
          },
          [`.max-w-${e(size)}`]: {
            'max-width': values[size],
          },
        }
      }, {}),
      variants('width')
    )
  }
}
