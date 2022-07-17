export default function () {
  return function divideColor({ addUtilities, theme, variants, e }) {
    const values = theme('divideColor')

    addUtilities(
      Object.keys(values).reduce((classes, color) => {
        if (color === 'default') return classes

        return {
          ...classes,
          [`.divide-${e(color)} > :not([hidden]) ~ :not([hidden])`]: {
            'border-color': values[color],
          },
        }
      }, {}),
      variants('divideColor')
    )
  }
}
