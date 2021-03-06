import _ from 'lodash'
import defineClass from './defineClass'

export default function defineClasses(classes) {
  const rules = _.map(classes, (properties, className) => {
    return defineClass(className, properties)
  })

  return rules
}
