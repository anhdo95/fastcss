const flex = require('../plugins/flex')
const textColors = require('../plugins/textColors')
const backgroundColors = require('../plugins/backgroundColors')
const sizing = require('../plugins/sizing')
const spacing = require('../plugins/spacing')

module.exports = function plugins(config) {
  return [
    { name: 'backgroundColor', generator: backgroundColors },
    { name: 'flex', generator: flex },
    { name: 'sizing', generator: sizing },
    { name: 'spacing', generator: spacing },
    { name: 'textColors', generator: textColors },
  ]
    .filter(({ name }) => config.modules[name])
    .map(({ generator }) => generator)
}
