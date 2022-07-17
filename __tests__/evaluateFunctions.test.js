import postcss from 'postcss'
import plugin from '../src/libs/evaluateFunctions'
import cw from '../src/utils/collapseWhitespaces'

function run(css, config = {}, opts = { from: '' }) {
  return postcss([plugin(config)]).process(css, opts)
}

describe('evaluateFunctions', () => {
  it('it looks up values in the config using dot notation', async () => {
    const config = {
      theme: {
        width: {
          '2/5': '40%',
          '4/5': '80%',
          '5/6': 'calc(100% / 6 * 5)',
        },
      },
    }

    const input = cw(`
      .container {
        max-width: theme('width.5/6');
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
      theme: {
        colors: {
          'green-lightest': '#eefff1',
          'teal-dark': '#249e9a',
          teal: '#4dc0b5',
          'teal-light': '#9eebe4',
          'teal-lightest': '#eefffd',
          'blue-dark': '#3687c8',
        },
      },
    }

    const input = cw(`
      .gradient {
        background-image: linear-gradient(
          to top,
          theme('colors.green-lightest'),
          theme('colors.teal-light')
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
