module.exports = {
  // prefix: 'tw-',

  purge: ['src/**/*.{js,html}'],

  theme: {
    extend: {},
  },

  // plugins: [
  //   function customUtilities({ addUtilities, addComponents }) {
  //     addComponents({
  //       '.card': {
  //         'min-width': '33.33333%',
  //         'max-width': '50%',
  //         'margin-top': '0.5rem',
  //         'margin-bottom': '0.5rem',
  //         'padding-top': '0.5rem',
  //         'padding-bottom': '0.5rem',
  //       },
  //     })

  //     addUtilities(
  //       {
  //         '.flex-center': {
  //           display: 'flex',
  //           'justify-content': 'center',
  //           'align-items': 'center',
  //         },
  //       },
  //       ['responsive']
  //     )
  //   },
  // ],

  corePlugins: {
    preflight: false,
  },
}
