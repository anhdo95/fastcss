module.exports = {
  // prefix: 'tw-',

  theme: {
    extend: {
      screens: {
        '3xs': '375px', // => @media (min-width: 375px) { ... }
        '2xs': '414px', // => @media (min-width: 414px) { ... }
        xs: '496px', // => @media (min-width: 496px) { ... }
      },

      width: {
        container: '496px',
      },

      height: {
        header: '54px',
      },

      colors: genColors(['dfdfdf', 'fcfbf8', '9196a2', '4dafa7', 'd9d9d9']),

      textColors(theme) {
        return {
          default: theme('colors.dfdfdf'),
        }
      },
    },
  },

  plugins: [
    function ({ addUtilities, addVariant }) {
      addUtilities(
        {
          '.flex-center': {
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center',
          },
        },
        { variants: ['responsive'] }
      )

      addVariant('first-child', function generator({ className, separator }) {
        return `.first-child${separator}${className}:first-child`
      })
    },
  ],

  corePlugins: {
    // flex: false
  },

  variants: {
    textColors: ['responsive', 'hover', 'active', 'first-child', 'group-hover']
  }
}

function genColors(arr) {
  return arr.reduce(
    (colors, color) => ({
      ...colors,
      [color]: `#${color}`,
    }),
    {}
  )
}
