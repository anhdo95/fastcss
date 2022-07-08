const parser = require('postcss-selector-parser')

module.exports = function prefixSelector(prefix, selector) {
  return parser((selectors) => {
    selectors.walkClasses((classSelector) => {
      classSelector.value = `${prefix}${classSelector.value}`
    })
  }).processSync(selector)
}
