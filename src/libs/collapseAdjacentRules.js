export default function collapseAdjacentRules() {
  return function (root) {
    let currentRule = null

    root.walkRules((rule) => {
      if (currentRule === null) {
        currentRule = rule
        return
      }

      if (currentRule.selector === rule.selector) {
        currentRule.append(rule.nodes)
        rule.remove()
      } else {
        currentRule = rule
      }
    })
  }
}
