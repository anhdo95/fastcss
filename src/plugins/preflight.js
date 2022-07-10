const fs = require('fs')
const path = require('path')
const postcss = require('postcss')

module.exports = function preflight() {
  return function ({ addBase }) {
    const preflightStyles = postcss.parse(fs.readFileSync(
      path.resolve(__dirname, '../../css/preflight.css'),
      'utf-8'
    ))
    addBase(preflightStyles.nodes)
  }
}
