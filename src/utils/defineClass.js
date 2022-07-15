import postcss from 'postcss'
import _ from 'lodash'
import escapeSelector from './escapeSelector'

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
