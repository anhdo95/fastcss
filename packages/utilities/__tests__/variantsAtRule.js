const postcss = require('postcss')
const plugin = require('../src/plugins/variantsAtRule')
const cw = require('../src/utils/collapseWhitespaces')

async function run(css, opts = { from: '' }) {
  return postcss([plugin]).process(css, opts)
}

describe('variantsAtRule', () => {
  it('it can generate hover variants', async () => {
    const input = `
      @variants hover {
        .text-green { color: green; }
      }
    `

    const output = cw(`
      .text-green { color: green; }
      .hover\\:text-green:hover { color: green; }
    `)

    return run(input).then((result) => {
      expect(cw(result.css)).toBe(output)
    })
  })

  it('it can generate focus variants', async () => {
    const input = `
      @variants focus {
        .text-green { color: green; }
      }
    `

    const output = cw(`
      .text-green { color: green; }
      .focus\\:text-green:focus { color: green; }
    `)

    return run(input).then((result) => {
      expect(cw(result.css)).toBe(output)
    })
  })

  it('it can generate hover and focus variants', async () => {
    const input = `
      @variants hover, focus {
        .text-green { color: green; }
      }
    `

    const output = cw(`
      .text-green { color: green; }
      .focus\\:text-green:focus { color: green; }
      .hover\\:text-green:hover { color: green; }
    `)

    return run(input).then((result) => {
      expect(cw(result.css)).toBe(output)
    })
  })

  it('it wraps the output in @responsive at-rule if responsive is included as a variant', async () => {
    const input = `
      @variants responsive, hover, focus {
        .text-green { color: green; }
      }
    `

    const output = cw(`
      @responsive {
        .text-green { color: green; }
        .focus\\:text-green:focus { color: green; }
        .hover\\:text-green:hover { color: green; }
      }
    `).trim()

    return run(input).then((result) => {
      expect(cw(result.css).trim()).toBe(output)
    })
  })
})
