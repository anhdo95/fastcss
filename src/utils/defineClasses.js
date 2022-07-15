import _ from 'lodash'
import defineClass from './defineClass'

module.exports = function defineClasses(classes) {
  const rules = _.map(classes, (properties, className) => {
    return defineClass(className, properties)
  })

  return rules
}
