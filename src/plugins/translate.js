const createUtilityPlugin = require('../utils/createUtilityPlugin')

module.exports = function translate() {
  return createUtilityPlugin('translate', [
    ['translate-x', ['--transform-translate-x']],
    ['translate-y', ['--transform-translate-y']]
  ])
}
