import fs from 'fs'
import path from 'path'
import postcss from 'postcss'

export default function preflight ({ addBase }) {
    const preflightStyles = postcss.parse(fs.readFileSync(
      path.resolve(__dirname, '../../css/preflight.css'),
      'utf-8'
    ))
    addBase(preflightStyles.nodes)
}
