const generateCustomMedia = require('./libs/generateCustomMedia')
const generateUtilities = require('./libs/generateUtilities')
const substituteApplyAtRule = require('./libs/substituteApplyAtRule')
const substituteResponsiveAtRule = require('./libs/substituteResponsiveAtRule')

module.exports = function utilitiesPlugin(root, { opts }) {
  generateCustomMedia(root, opts)
  generateUtilities(root, opts)
  substituteApplyAtRule(root, opts)
  substituteResponsiveAtRule(root, opts)
}
