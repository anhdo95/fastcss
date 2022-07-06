const postcss = require('postcss')
const utilities = require('../utilityModules')
const wrapWithVariants = require('./wrapWithVariants')

module.exports = function generateModules(config) {
  utilities.forEach((utility) => {
    if (config.modules[utility.name] === undefined) {
      throw new Error(`Module \`${utility.name}\` is missing from the config`)
    }
  })

  return postcss.root({
    nodes: utilities
      .filter(({ name }) => config.modules[name])
      .map(({ name, generator }) =>
        wrapWithVariants(config.modules[name], generator(config))
      ),
  })
}
