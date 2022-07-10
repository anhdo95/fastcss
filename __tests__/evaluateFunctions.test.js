const postcss = require('postcss')
const plugin = require('../src/libs/evaluateFunctions')
const cw = require('../src/utils/collapseWhitespaces')

function run(css, config = {}, opts = { from: '' }) {
  return postcss([plugin(config)]).process(css, opts)
}

describe('evaluateFunctions', () => {
  it('it looks up values in the config using dot notation', async () => {
    const config = {
      sizing: {
        common: {
          '2/5': '40%',
          '4/5': '80%',
          '5/6': 'calc(100% / 6 * 5)',
        },
      },
    }

    const input = cw(`
      .container {
        max-width: config('sizing.common.5/6');
      }
    `)

    const output = cw(`
      .container {
        max-width: calc(100% / 6 * 5);
      }
    `)

    return run(input, config).then((result) => {
      expect(result.css).toBe(output)
    })
  })

  it('quotes are optional around the lookup path', async () => {
    const config = {
      colors: {
        'green-lightest': '#eefff1',
        'teal-dark': '#249e9a',
        teal: '#4dc0b5',
        'teal-light': '#9eebe4',
        'teal-lightest': '#eefffd',
        'blue-dark': '#3687c8',
      },
    }

    const input = cw(`
      .gradient {
        background-image: linear-gradient(
          to top,
          config(colors.green-lightest),
          config(colors.teal-light)
        );
      }
    `)

    const output = cw(`
    .gradient {
      background-image: linear-gradient(
        to top,
        #eefff1,
        #9eebe4
      );
    }
    `)

    return run(input, config).then((result) => {
      expect(result.css).toBe(output)
    })
  })
})
