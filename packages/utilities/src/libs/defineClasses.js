const postcss = require('postcss')
const _ = require('lodash')

module.exports = function defineClasses(classes) {
  function defineClass(className, properties) {
    const decls = _.map(properties, (value, prop) => {
      return postcss.decl({
        prop: _.kebabCase(prop),
        value,
      })
    })

    return postcss.rule({
      selector: `.${className}`,
    }).append(decls)
  }

  const rules = _.map(classes, (properties, className) => {
    return defineClass(className, properties)
  })

  return rules
}