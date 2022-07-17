export default function () {
  return function borderWidth({ addUtilities, theme, variants, e }) {
    const values = theme('borderWidth')

    addUtilities(
      Object.keys(values).reduce((classes, size) => {
        const modifier = size === 'default' ? '' : `-${e(size)}`
        return {
          ...classes,
          [`.border${modifier}`]: {
            'border-width': values[size],
          },
          [`.border-t${modifier}`]: {
            'border-top-width': values[size],
          },
          [`.border-b${modifier}`]: {
            'border-bottom-width': values[size],
          },
          [`.border-l${modifier}`]: {
            'border-left-width': values[size],
          },
          [`.border-r${modifier}`]: {
            'border-right-width': values[size],
          },
        }
      }, {}),
      variants('borderWidth')
    )
  }
}
