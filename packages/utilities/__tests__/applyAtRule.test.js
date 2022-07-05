const postcss = require('postcss')
const plugin = require('../src/plugins/applyAtRule')
const cw = require('../src/utils/collapseWhitespaces')

async function run(css, opts = { from: '' }) {
  return postcss([plugin]).process(css, opts)
}

describe('applyAtRule', () => {
  it('it copies a class in declarations into its self', async () => {
    const input = cw(`
      .p-8 { padding: 2rem };

      .container {
        margin-left: auto;
        margin-right: auto;
        @apply p-8;
      }
    `)

    const output = cw(`
      .p-8 { padding: 2rem };

      .container {
        margin-left: auto;
        margin-right: auto;
        padding: 2rem;
      }
    `)

    return run(input).then((result) => {
      expect(result.css).toBe(output)
    })
  })

  it('it does not copy a class in media declarations into its self', async () => {
    const input = cw(`
      @media (min-width: 768px) {
        .p-8 { padding: 2rem };
      }

      .container {
        margin-left: auto;
        margin-right: auto;
        @apply p-8;
      }
    `)

    return run(input)
      .then((result) => {
        throw result
      })
      .catch((error) => {
        expect(error.reason).toBe('Unkown selector .p-8')
      })
  })

  it('it fails if the class does not exist', async () => {
    const input = cw(`
      .container {
        @apply p-8;
      }
    `)

    const output = 'Unkown selector .p-8'

    return run(input).catch((error) => {
      expect(error.reason).toBe(output)
    })
  })
})
