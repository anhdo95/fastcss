export default function collapseAdjacentRules() {
  return function (root) {
    let currentRule = null

    root.each((node) => {
      if (node.type !== 'rule') {
        currentRule = null
        return
      }

      if (currentRule === null) {
        currentRule = node
        return
      }

      if (currentRule.selector === node.selector) {
        currentRule.append(node.nodes)
        node.remove()
      } else {
        currentRule = node
      }
    })
  }
}
