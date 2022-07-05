const postcss = require('postcss')
const plugin = require('../src/plugins/hoverableAtRule')
const cw = require('../src/utils/collapseWhitespaces')

async function run(css, opts = { from: '' }) {
  return postcss([plugin]).process(css, opts)
}

describe('hoverableAtRule', () => {
  it('it adds a hoverable variant to each class definition', async () => {
    const input = cw(`
      @hoverable {
        .text-green {
          color: green;
        }

        .bg-indigo {
          background-color: #6574cd;
        }
      }
    `)

    const output = cw(`
      .text-green, .hover\\:text-green:hover {
        color: green;
      }

      .bg-indigo, .hover\\:bg-indigo:hover {
        background-color: #6574cd;
      }
    `)

    return run(input).then((result) => {
      expect(result.css).toBe(output)
    })
  })
})
