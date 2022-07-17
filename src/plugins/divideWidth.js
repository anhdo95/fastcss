export default function () {
  return function divideWidth({ addUtilities, theme, variants, e }) {
    const values = theme('divideWidth')

    addUtilities(
      [
        Object.keys(values).reduce((classes, size) => {
          const modifier = size === 'default' ? '' : `-${e(size)}`
          return {
            ...classes,
            [`.divide-x${modifier} > :not([hidden]) ~ :not([hidden])`]: {
              '--divide-x-reverse': '0',
              'border-left-width': `calc(${values[size]} * (1 - var(--divide-x-reverse)))`,
              'border-right-width': `calc(${values[size]} * var(--divide-x-reverse))`,
            },
            [`.divide-y${modifier} > :not([hidden]) ~ :not([hidden])`]: {
              '--divide-y-reverse': '0',
              'border-top-width': `calc(${values[size]} * (1 - var(--divide-y-reverse)))`,
              'border-bottom-width': `calc(${values[size]} * var(--divide-y-reverse))`,
            },
          }
        }, {}),
        {
          '.divide-x-reverse > :not([hidden]) ~ :not([hidden])': {
            '--divide-x-reverse': '1',
          },
          '.divide-y-reverse > :not([hidden]) ~ :not([hidden])': {
            '--divide-y-reverse': '1',
          },
        },
      ],
      variants('divideWidth')
    )
  }
}
