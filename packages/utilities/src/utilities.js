const generateCustomMedia = require('./libs/generateCustomMedia')
const generateUtilities = require('./libs/generateUtilities')
const substitutePreflightAtRule = require('./libs/substitutePreflightAtRule')
const substituteApplyAtRule = require('./libs/substituteApplyAtRule')
const substituteResponsiveAtRule = require('./libs/substituteResponsiveAtRule')
const substituteHoverableAtRule = require('./libs/substituteHoverableAtRule')

module.exports = function utilitiesPlugin(root, { opts }) {
  generateCustomMedia(root, opts)
  generateUtilities(root, opts)
  generateUtilities(root, opts)
  substitutePreflightAtRule(root, opts)
  substituteApplyAtRule(root, opts)
  substituteHoverableAtRule(root, opts)
  substituteResponsiveAtRule(root, opts)
}
