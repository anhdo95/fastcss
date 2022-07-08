const flex = require('../generators/flex')
const textColors = require('../generators/textColors')
const backgroundColors = require('../generators/backgroundColors')
const sizing = require('../generators/sizing')
const spacing = require('../generators/spacing')

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
