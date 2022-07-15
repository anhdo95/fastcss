import createUtilityPlugin from '../utils/createUtilityPlugin'

module.exports = function translate() {
  return createUtilityPlugin('translate', [
    ['translate-x', ['--transform-translate-x']],
    ['translate-y', ['--transform-translate-y']]
  ])
}
