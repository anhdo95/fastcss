import fs from 'fs'
import path from 'path'
import postcss from 'postcss'
import fast from '../..'

function run(css, config = {}) {
  return postcss([fast(config)]).process(css, { from: '' })
}

describe('@apply', () => {
  test.only('@apply matched utilities', () => {
    const config = {
      purge: [path.resolve(__dirname, './index.test.html')],
      corePlugins: {
        preflight: false,
      },
    }

    const css = `
      @fast base;
      @fast components;
      @fast utilities;

      .card {
        display: flex;
        align-items: center;

        @apply px-4 mx-auto !important;
        @apply bg-white text-black;

        min-width: 1024px;
        max-width: 100%;
        overflow: hidden;
      }
    `

    return run(css, config)
      .then((result) => {
        const expected = fs.readFileSync(
          path.resolve(__dirname, 'index.test.css'),
          'utf-8'
        )
        expect(result.css).toMatchCss(expected)
      })
  })
})
