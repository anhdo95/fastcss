import parser from 'postcss-selector-parser'

export default function prefixSelector(prefix, selector) {
  return parser((selectors) => {
    selectors.walkClasses((classSelector) => {
      classSelector.value = classSelector.value.startsWith('-')
        ? `-${prefix}${classSelector.value.slice(1)}`
        : `${prefix}${classSelector.value}`
    })
  }).processSync(selector)
}
