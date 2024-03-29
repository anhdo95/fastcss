module.exports = {
  prefix: '',
  separator: ':',
  important: false,
  purge: [],

  theme: {
    screens: {
      xs: '445px',
      sm: '768px',
      md: '992px',
      lg: '1200px',
    },

    colors: {
      black: '#000000',
      'grey-900': '#212b35',
      'grey-800': '#404e5c',
      'grey-700': '#647382',
      'grey-600': '#919eab',
      'grey-500': '#c5ced6',
      'grey-400': '#dfe3e8',
      'grey-300': '#f0f2f5',
      'grey-200': '#f7f9fa',
      white: '#ffffff',
      'red-dark': '#d43633',
      red: '#f25451',
      'red-light': '#fa8785',
      'red-lightest': '#fff1f0',
      'orange-dark': '#f29500',
      orange: '#ffb82b',
      'orange-light': '#ffd685',
      'orange-lightest': '#fff8eb',
      'yellow-dark': '#ffc400',
      yellow: '#ffe14a',
      'yellow-light': '#ffea83',
      'yellow-lightest': '#fffbe5',
      'green-dark': '#34ae4c',
      green: '#57d06f',
      'green-light': '#b1f3be',
      'green-lightest': '#eefff1',
      'teal-dark': '#249e9a',
      teal: '#4dc0b5',
      'teal-light': '#9eebe4',
      'teal-lightest': '#eefffd',
      'blue-dark': '#3687c8',
      blue: '#4aa2ea',
      'blue-light': '#acdaff',
      'blue-lightest': '#f1f9ff',
      'indigo-dark': '#4957a5',
      indigo: '#6574cd',
      'indigo-light': '#bcc5fb',
      'indigo-lightest': '#f4f5ff',
      'purple-dark': '#714cb4',
      purple: '#976ae6',
      'purple-light': '#ceb3ff',
      'purple-lightest': '#f7f3ff',
      'pink-dark': '#d84f7d',
      pink: '#f66d9b',
      'pink-light': '#ffa5c3',
      'pink-lightest': '#fdf2f5',
    },

    textColor(theme) {
      return theme('colors')
    },

    backgroundColor(theme) {
      return theme('colors')
    },

    opacity: {
      0: '0',
      5: '0.05',
      10: '0.1',
      20: '0.2',
      25: '0.25',
      30: '0.3',
      40: '0.4',
      50: '0.5',
      60: '0.6',
      70: '0.7',
      75: '0.75',
      80: '0.8',
      90: '0.9',
      95: '0.95',
      100: '1',
    },

    textOpacity(theme) {
      return theme('opacity')
    },

    backgroundOpacity(theme) {
      return theme('opacity')
    },

    spacing: {
      auto: 'auto',
      px: '1px',
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      32: '8rem',
    },

    width(theme) {
      return {
        ...theme('spacing'),
        48: '12rem',
        64: '16rem',
        '1/2': '50%',
        '1/3': '33.33333%',
        '2/3': '66.66667%',
        '1/4': '25%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.66667%',
        '5/6': '83.33333%',
        full: '100%',
        screen: '100vw',
      }
    },

    height(theme) {
      return {
        ...theme('spacing'),
        48: '12rem',
        64: '16rem',
        full: '100%',
        screen: '100vh',
      }
    },

    margin(theme, { negative }) {
      return {
        ...theme('spacing'),
        ...negative(theme('spacing')),
      }
    },

    padding(theme) {
      return theme('spacing')
    },

    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      4: '4px',
      8: '8px',
    },

    borderColor(theme) {
      return {
        ...theme('colors'),
        DEFAULT: theme('colors.grey-300', 'currentColor'),
      }
    },

    divideWidth(theme) {
      return theme('borderWidth')
    },

    divideColor(theme) {
      return theme('borderColor')
    },

    flex: {
      1: '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none',
    },

    translate: (theme, { negative }) => ({
      ...theme('spacing'),
      ...negative(theme('spacing')),
      '-full': '-100%',
      '-1/2': '-50%',
      '1/2': '50%',
      full: '100%',
    }),

    rotate: {
      '-180': '-180deg',
      '-90': '-90deg',
      '-45': '-45deg',
      '-12': '-12deg',
      '-6': '-6deg',
      '-3': '-3deg',
      '-2': '-2deg',
      '-1': '-1deg',
      0: '0deg',
      1: '1deg',
      2: '2deg',
      3: '3deg',
      6: '6deg',
      12: '12deg',
      45: '45deg',
      90: '90deg',
      180: '180deg',
    },

    scale: {
      0: '0',
      50: '.5',
      75: '.75',
      90: '.9',
      95: '.95',
      100: '1',
      105: '1.05',
      110: '1.1',
      125: '1.25',
      150: '1.5',
    },
  },

  variants: {
    textColor: ['responsive', 'hover', 'active', 'group-hover'],
    backgroundColor: ['responsive', 'hover'],
    textOpacity: ['responsive', 'hover', 'active', 'group-hover'],
    backgroundOpacity: ['responsive', 'hover'],
    display: ['responsive'],
    flex: ['responsive'],
    width: ['responsive'],
    height: ['responsive'],
    margin: ['responsive'],
    padding: ['responsive'],
    borderWidth: ['responsive'],
    borderColor: ['responsive'],
    divideWidth: ['responsive'],
    divideColor: ['responsive'],
    transform: ['responsive'],
    translate: ['responsive', 'hover', 'focus'],
    rotate: ['responsive', 'hover', 'focus'],
    scale: ['responsive', 'hover', 'focus'],
  },

  corePlugins: {
    // flex: false,
  },

  plugins: [],
}
