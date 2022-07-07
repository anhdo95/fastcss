const postcss = require('postcss')
const processPlugins = require('../src/utils/processPlugins')
const cw = require('../src/utils/collapseWhitespaces')

function run(plugins) {
  return processPlugins(plugins)
}

function css(nodes) {
  return cw(postcss.root({ nodes }).toString())
}

describe('processPlugins', () => {
  it('It can create components with object syntax', () => {
    const input = [
      function ({ addComponents }) {
        addComponents({
          '.btn': {
            display: 'inline-block',
            'text-align': 'center',
            'vertical-align': 'middle',
            border: '1px solid transparent',
            padding: '0.375rem 0.75rem',
          },
        })
      },
    ]

    const output = cw(`
      .btn {
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        border: 1px solid transparent;
        padding: 0.375rem 0.75rem
      }
    `).trim()

    const { pluginComponents } = run(input)
    expect(css(pluginComponents)).toBe(output)
  })

  it('It can create components with objects-in-array syntax', () => {
    const input = [
      function ({ addComponents }) {
        addComponents([
          {
            '.container': {
              'max-width': '320px'
            }
          },
          {
            '.btn': {
              display: 'inline-block',
              'text-align': 'center',
              'vertical-align': 'middle',
              border: '1px solid transparent',
              padding: '0.375rem 0.75rem',
            },
          },
        ])
      },
    ]

    const output = cw(`
      .container {
        max-width: 320px
      }

      .btn {
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        border: 1px solid transparent;
        padding: 0.375rem 0.75rem
      }
    `).trim()

    const { pluginComponents } = run(input)
    expect(css(pluginComponents)).toBe(output)
  })
})
