export default function () {
  return function borderColor({ addUtilities, theme, variants, e }) {
    const values = theme('borderColor')

    addUtilities(
      Object.keys(values).reduce((classes, size) => {
        if (size === 'default') {
          return classes
        }

        const modifier = `-${e(size)}`
        return {
          ...classes,
          [`.border${modifier}`]: {
            'border-color': values[size],
          },
          [`.border-t${modifier}`]: {
            'border-top-color': values[size],
          },
          [`.border-b${modifier}`]: {
            'border-bottom-color': values[size],
          },
          [`.border-l${modifier}`]: {
            'border-left-color': values[size],
          },
          [`.border-r${modifier}`]: {
            'border-right-color': values[size],
          },
        }
      }, {}),
      variants('borderColor')
    )
  }
}
