const comparableNodes = {
  atrule: ['name', 'params'],
  rule: ['selector']
}

export default function collapseAdjacentRules() {
  return function (root) {
    let currentRule = null

    root.each((node) => {
      if (!comparableNodes.hasOwnProperty(node.type)) {
        currentRule = null
        return
      }

      if (currentRule === null) {
        currentRule = node
        return
      }

      const properties = comparableNodes[node.type]

      if (properties.every(prop => currentRule[prop] === node[prop])) {
        currentRule.append(node.nodes)
        node.remove()
      } else {
        currentRule = node
      }
    })
  }
}
