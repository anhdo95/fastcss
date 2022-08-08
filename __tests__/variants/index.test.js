import fs from 'fs'
import path from 'path'
import postcss from 'postcss'
import fast from '../..'

const cssPath = path.resolve(__dirname, 'index.test.css')
const htmlPath = path.resolve(__dirname, 'index.test.html')

function run(css, config = {}) {
  return postcss([fast(config)]).process(css, { from: '' })
}

describe('variants', () => {
  test('it generates used utilities with variants', () => {
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
    `

    return run(css, config).then((result) => {
      const expected = fs.readFileSync(cssPath, 'utf-8')
      expect(result.css).toMatchCss(expected)
    })
  })
})
