const postcss = require('postcss')
const _ = require('lodash')
const escapeSelector = require('./escapeSelector')

module.exports = function defineClass(className, properties) {
  const decls = _.map(properties, (value, prop) => {
    return postcss.decl({
      prop: _.kebabCase(prop),
      value,
    })
  })

  return postcss
    .rule({
      selector: `.${escapeSelector(className)}`,
    })
    .append(decls)
}
