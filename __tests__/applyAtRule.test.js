import postcss from 'postcss'
import plugin from '../src/libs/applyAtRule'
import cw from '../src/utils/collapseWhitespaces'
import { shared } from '../src/utils/disposables'

async function run(css, opts = { from: '' }) {
  return postcss([plugin({ prefix: '' })]).process(css, opts)
}

describe.only('applyAtRule', () => {
  afterEach(() => shared.dispose())

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
        expect(error.reason).toBe('Unknown selector .p-8')
      })
  })

  it('applied rules can be made !important', async () => {
    const input = cw(`
      .container {
        max-width: 100%;
      }

      .main {
        @apply !container;
      }
    `)

    const output = cw(`
      .container {
        max-width: 100%;
      }

      .main {
        max-width: 100% !important;
      }
    `)

    return run(input).then((result) => {
      expect(result.css).toBe(output)
    })
  })

  it('it fails if the class does not exist', async () => {
    const input = cw(`
      .container {
        @apply p-8;
      }
    `)

    return run(input)
      .then((result) => {
        throw result
      })
      .catch((error) => {
        expect(error).toMatchObject({ name: 'CssSyntaxError' })
      })
  })

  it("it fails if the class has the same name as the parent's applied selector", async () => {
    const input = cw(`
      .container {
        max-width: 100%;
      }

      .container {
        @apply container;
      }
    `)

    return run(input)
      .then((result) => {
        throw result
      })
      .catch((error) => {
        expect(error).toMatchObject({ name: 'CssSyntaxError' })
      })
  })

  it('it fails if the class has mutliple rulesets', async () => {
    const input = cw(`
      .container {
        max-width: 100%;
      }

      .container {
        width: 100%;
      }

      .main {
        @apply container;
      }
    `)

    return run(input)
      .then((result) => {
        throw result
      })
      .catch((error) => {
        expect(error).toMatchObject({ name: 'CssSyntaxError' })
      })
  })

  it('it fails if the class matches with classes that include pseudo-selectors', async () => {
    const input = cw(`
      .text-red:hover {
        color: red;
      }

      .main {
        @apply text-red;
      }
    `)

    return run(input)
      .then((result) => {
        throw result
      })
      .catch((error) => {
        expect(error).toMatchObject({ name: 'CssSyntaxError' })
      })
  })

  it('it removes important from applied classes', async () => {
    const input = cw(`
      .container {
        max-width: 100% !important;
      }

      .main {
        @apply container;
      }
    `)

    const output = cw(`
      .container {
        max-width: 100% !important;
      }

      .main {
        max-width: 100%;
      }
    `)

    return run(input).then((result) => {
      expect(result.css).toBe(output)
    })
  })
})
