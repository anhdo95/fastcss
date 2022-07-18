module.exports = {
  // prefix: 'tw-',
  important: true,

  theme: {
    extend: {
      screens: {
        'xxxs': '375px', // => @media (min-width: 375px) { ... }
        'xxs': '414px', // => @media (min-width: 414px) { ... }
        xs: '496px', // => @media (min-width: 496px) { ... }
      },

      width: {
        container: '496px',
      },

      height: {
        header: '54px',
      },

      colors: genColors(['dfdfdf', 'fcfbf8', '9196a2', '4dafa7', 'd9d9d9']),

      textColor(theme) {
        return {
          default: theme('colors.dfdfdf'),
        }
      },
    },
  },

  plugins: [
    function customUtilities ({ addUtilities, addComponents }) {
      addComponents({
        '.card': {
          'min-width': '33.33333%',
          'max-width': '50%',
          'margin-top': '0.5rem',
          'margin-bottom': '0.5rem',
          'padding-top': '0.5rem',
          'padding-bottom': '0.5rem',
        }
      })

      addUtilities(
        {
          '.flex-center': {
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center',
          },
        },
        ['responsive']
      )
    },
  ],

  variants: {
    textColor: ['responsive', 'hover', 'active', 'first-child', 'group-hover'],
  },
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
