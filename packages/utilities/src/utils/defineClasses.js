const _ = require('lodash')
const defineClass = require('./defineClass')

module.exports = function defineClasses(classes) {
  const rules = _.map(classes, (properties, className) => {
    return defineClass(className, properties)
  })

  return rules
}
