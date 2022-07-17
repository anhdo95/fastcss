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
        textColor: ['hover'],
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
        textColor: ['hover'],
      },
    })
  })

  it('theme key is merged instead of replaced', () => {
    const userConfig = {
      variants: {
        textColor: [],
        backgroundColor: ['responsive'],
      },
    }

    const defaultConfig = {
      theme: {},
      variants: {
        textColor: ['hover'],
        width: ['responsive'],
        height: ['responsive'],
      },
    }

    const resolved = resolveConfig([userConfig, defaultConfig])

    expect(resolved).toEqual({
      theme: {},
      variants: {
        textColor: [],
        backgroundColor: ['responsive'],
        width: ['responsive'],
        height: ['responsive'],
      },
    })
  })

  it('variants key is merged instead of replaced', () => {
    const userConfig = {
      variants: {
        textColor: [],
        backgroundColor: ['responsive'],
      },
    }

    const defaultConfig = {
      theme: {},
      variants: {
        textColor: ['hover'],
        width: ['responsive'],
        height: ['responsive'],
      },
    }

    const resolved = resolveConfig([userConfig, defaultConfig])

    expect(resolved).toEqual({
      theme: {},
      variants: {
        textColor: [],
        backgroundColor: ['responsive'],
        width: ['responsive'],
        height: ['responsive'],
      },
    })
  })

  it('theme function can resolve function values', () => {
    const userConfig = {
      theme: {
        textColor(theme) {
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
        textColor: {
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
        backgroundColor(theme) {
          return {
            default: theme("textColor.grey-700"),
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
        textColor(theme) {
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
        textColor: {
          'grey-700': '#647382',
          'grey-600': '#919eab',
          white: '#fff',
        },
        backgroundColor: {
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
