const postcss = require('postcss')
const cloneNodes = require('./cloneNodes')

module.exports = function wrapWithVariants(variants, rules) {
  return postcss.atRule({
    name: 'variants',
    params: variants.join(', '),
    nodes: cloneNodes(rules)
  })
}
