import postcss from 'postcss'
import cloneNodes from './cloneNodes'

export default function wrapWithVariants(variants, rules) {
  return postcss.atRule({
    name: 'variants',
    params: variants.join(', '),
    nodes: cloneNodes(rules)
  })
}
