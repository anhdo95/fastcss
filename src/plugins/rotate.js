const createUtilityPlugin = require('../utils/createUtilityPlugin')

module.exports = function rotate() {
  return createUtilityPlugin('rotate', [['rotate', ['--transform-rotate']]])
}
