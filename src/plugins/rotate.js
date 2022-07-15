import createUtilityPlugin from '../utils/createUtilityPlugin'

module.exports = function rotate() {
  return createUtilityPlugin('rotate', [['rotate', ['--transform-rotate']]])
}
