import fs from 'fs'
import path from 'path'
import postcss from 'postcss'
import fast from '../..'

const cssPath = path.resolve(__dirname, 'index.test.css')
const htmlPath = path.resolve(__dirname, 'index.test.html')

function run(css, config = {}) {
  return postcss([fast(config)]).process(css, { from: '' })
}

describe('@apply', () => {
  test('@apply matched utilities', () => {
    const config = {
      purge: [htmlPath],
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

    return run(css, config).then((result) => {
      const expected = fs.readFileSync(cssPath, 'utf-8')
      expect(result.css).toMatchCss(expected)
    })
  })

  test('@apply error with unknown utility', async () => {
    const config = {
      purge: [htmlPath],
      corePlugins: {
        preflight: false,
      },
    }

    const css = `
      @fast components;
      @fast utilities;

      .card {
        @apply unknown-utility;
      }
    `

    await expect(run(css, config)).rejects.toThrowError(
      'The `unknown-utility` does not exist.'
    )
  })
})
