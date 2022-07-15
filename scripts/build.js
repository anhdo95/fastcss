import fs from 'fs'
import path from 'path'
import postcss from 'postcss'
import fast from '..'

function build(filename) {
  return new Promise((resolve, reject) => {
    const from = `./${filename}.css`
    const to = `./dist/${filename}.css`
    const toMap = `./dist/${filename}.css.map`

    console.log(`Processing ${from}...`)

    fs.readFile(from, (err, css) => {
      if (err) {
        throw err
      }

      postcss([fast])
        .process(css, {
          from,
          to,
          map: { inline: false },
        })
        .then((result) => {
          if (!fs.existsSync(to)) {
            fs.mkdirSync(path.dirname(to), { recursive: true })
          }

          fs.writeFileSync(to, result.css)
          if (result.map) {
            fs.writeFileSync(toMap, JSON.stringify(result.map))
          }

          resolve()
        })
        .catch((error) => reject(error))
    })
  })
}

Promise.all([
  build('base'),
  build('components'),
  build('utilities'),
  build('fast'),
]).then(() => {
  console.log('Finished Building Fastcss!')
})
