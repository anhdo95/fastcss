import postcss from 'postcss'
import cloneNodes from './cloneNodes'

module.exports = function wrapWithVariants(variants, rules) {
  return postcss.atRule({
    name: 'variants',
    params: variants.join(', '),
    nodes: cloneNodes(rules)
  })
}
