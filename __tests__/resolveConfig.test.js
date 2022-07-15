import resolveConfig from '../src/utils/resolveConfig'

describe('resolveConfig', () => {
  it('theme key is merged instead of replaced', () => {
    const userConfig = {
      theme: {
        screens: {
          '3xs': '375px',
          '2xs': '414px',
          xs: '496px',
        },

        colors: {
          black: '#000000',
          'grey-900': '#212b35',
          'grey-800': '#404e5c',
        },
      },
    }

    const defaultConfig = {
      theme: {
        screens: {
          sm: '768px',
        },
      },
      variants: {
        textColors: ['hover'],
      },
    }

    const resolved = resolveConfig([userConfig, defaultConfig])

    expect(resolved).toEqual({
      theme: {
        colors: {
          black: '#000000',
          'grey-900': '#212b35',
          'grey-800': '#404e5c',
        },
        screens: {
          '3xs': '375px',
          '2xs': '414px',
          xs: '496px',
        },
      },
      variants: {
        textColors: ['hover'],
      },
    })
  })

  it('theme key is merged instead of replaced', () => {
    const userConfig = {
      variants: {
        textColors: [],
        backgroundColors: ['responsive'],
      },
    }

    const defaultConfig = {
      theme: {},
      variants: {
        textColors: ['hover'],
        width: ['responsive'],
        height: ['responsive'],
      },
    }

    const resolved = resolveConfig([userConfig, defaultConfig])

    expect(resolved).toEqual({
      theme: {},
      variants: {
        textColors: [],
        backgroundColors: ['responsive'],
        width: ['responsive'],
        height: ['responsive'],
      },
    })
  })

  it('variants key is merged instead of replaced', () => {
    const userConfig = {
      variants: {
        textColors: [],
        backgroundColors: ['responsive'],
      },
    }

    const defaultConfig = {
      theme: {},
      variants: {
        textColors: ['hover'],
        width: ['responsive'],
        height: ['responsive'],
      },
    }

    const resolved = resolveConfig([userConfig, defaultConfig])

    expect(resolved).toEqual({
      theme: {},
      variants: {
        textColors: [],
        backgroundColors: ['responsive'],
        width: ['responsive'],
        height: ['responsive'],
      },
    })
  })

  it('theme function can resolve function values', () => {
    const userConfig = {
      theme: {
        textColors(theme) {
          return {
            default: theme("colors.grey-700"),
            ...theme('colors'),
          }
        },
      },
    }

    const defaultConfig = {
      theme: {
        colors: {
          'grey-700': '#647382',
          'grey-600': '#919eab',
          white: '#fff',
        },
      },
      variants: {}
    }

    const resolved = resolveConfig([userConfig, defaultConfig])

    expect(resolved).toEqual({
      theme: {
        colors: {
          'grey-700': '#647382',
          'grey-600': '#919eab',
          white: '#fff',
        },
        textColors: {
          default: '#647382',
          'grey-700': '#647382',
          'grey-600': '#919eab',
          white: '#fff',
        },
      },
      variants: {}
    })
  })

  it('theme function can resolve deep function values', () => {
    const userConfig = {
      theme: {
        backgroundColors(theme) {
          return {
            default: theme("textColors.grey-700"),
            ...theme('colors'),
          }
        },
      },
    }

    const defaultConfig = {
      theme: {
        colors: {
          'grey-700': '#647382',
          'grey-600': '#919eab',
          white: '#fff',
        },
        textColors(theme) {
          return theme('colors')
        }
      },
      variants: {}
    }

    const resolved = resolveConfig([userConfig, defaultConfig])

    expect(resolved).toEqual({
      theme: {
        colors: {
          'grey-700': '#647382',
          'grey-600': '#919eab',
          white: '#fff',
        },
        textColors: {
          'grey-700': '#647382',
          'grey-600': '#919eab',
          white: '#fff',
        },
        backgroundColors: {
          default: '#647382',
          'grey-700': '#647382',
          'grey-600': '#919eab',
          white: '#fff',
        },
      },
      variants: {}
    })
  })
})
