const postcss = require('postcss')
const plugin = require('../src/plugins/variantsAtRule')
const cw = require('../src/utils/collapseWhitespaces')
const processPlugins = require('../src/utils/processPlugins')

async function run(css, plugins = {}, opts = { from: '' }) {
  if (Object.keys(plugins).length) {
    plugins = processPlugins({ plugins })
  }

  return postcss([plugin({}, plugins)]).process(css, opts)
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

  it('it can generate active variants', async () => {
    const input = `
      @variants active {
        .text-green { color: green; }
      }
    `

    const output = cw(`
      .text-green { color: green; }
      .active\\:text-green:active { color: green; }
    `)

    return run(input).then((result) => {
      expect(cw(result.css)).toBe(output)
    })
  })

  it('it can generate an additional variant from the config', async () => {
    const plugins = [
      function({ addVariant }) {
        addVariant('first-child', function generator({ className, separator }) {
          return `.first-child${separator}${className}:first-child`
        })
      }
    ]

    const input = `
      @variants first-child {
        .text-green { color: green; }
      }
    `

    const output = cw(`
      .text-green { color: green; }
      .first-child\\:text-green:first-child { color: green; }
    `)

    return run(input, plugins).then((result) => {
      expect(cw(result.css)).toBe(output)
    })
  })

  it('it can generate hover, focus and active variants', async () => {
    const input = `
      @variants hover, focus, active {
        .text-green { color: green; }
      }
    `

    const output = cw(`
      .text-green { color: green; }
      .hover\\:text-green:hover { color: green; }
      .focus\\:text-green:focus { color: green; }
      .active\\:text-green:active { color: green; }
    `)

    return run(input).then((result) => {
      expect(cw(result.css)).toBe(output)
    })
  })

  it('it can generate hover, focus, active and last-child variants', async () => {
    const plugins = [
      function({ addVariant }) {
        addVariant('last-child', function generator({ className, separator }) {
          return `.last-child${separator}${className}:last-child`
        })
      }
    ]

    const input = `
      @variants hover, focus, active, last-child {
        .text-green { color: green; }
      }
    `

    const output = cw(`
      .text-green { color: green; }
      .hover\\:text-green:hover { color: green; }
      .focus\\:text-green:focus { color: green; }
      .active\\:text-green:active { color: green; }
      .last-child\\:text-green:last-child { color: green; }
    `)

    return run(input, plugins).then((result) => {
      expect(cw(result.css)).toBe(output)
    })
  })

  it('it wraps the output in @responsive at-rule if responsive is included as a variant', async () => {
    const input = `
      @variants responsive, hover, focus, active {
        .text-green { color: green; }
      }
    `

    const output = cw(`
      @responsive {
        .text-green { color: green; }
        .hover\\:text-green:hover { color: green; }
        .focus\\:text-green:focus { color: green; }
        .active\\:text-green:active { color: green; }
      }
    `).trim()

    return run(input).then((result) => {
      expect(cw(result.css).trim()).toBe(output)
    })
  })
})
