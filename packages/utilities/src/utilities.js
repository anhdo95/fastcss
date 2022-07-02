const buildScreens = require('./screens')

module.exports = function utilitiesPlugin(root, { opts }) {
  buildScreens(root, opts)
}