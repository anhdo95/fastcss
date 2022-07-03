const buildScreens = require('./screens')
const buildColors = require('./colors')
const substituteApplyAtRules = require('./applyAtRules')
const generateCustomMedia = require('./libs/generateCustomMedia')
const generateUtilities = require('./libs/generateUtilities')
const substituteResponsiveAtRule = require('./libs/substituteResponsiveAtRule')

module.exports = function utilitiesPlugin(root, { opts }) {
  generateCustomMedia(root, opts)
  generateUtilities(root, opts)
  substituteResponsiveAtRule(root, opts)
}
