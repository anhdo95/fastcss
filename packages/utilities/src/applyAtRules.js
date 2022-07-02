const postcss = require('postcss')

module.exports = function substituteApplyAtRules(root) {
  function findNodesBySelector(selector) {
    const matches = [];
    root.walkRules(rule => {
      if (rule.selector === selector) {
        matches.push(...rule.clone().nodes)
      }
    })

    return matches
  }

  root.walkAtRules('apply', rule => {
    const classes = postcss.list.space(rule.params)
    const parent = rule.parent

    classes.forEach((className) => {
      const selector = `.${className}`
      const matches = findNodesBySelector(selector)

      if (!matches.length) {
        throw rule.error(`Unkown selector ${selector}`)
      }

      parent.insertBefore(rule, matches)
      rule.remove()
    })
    
  })
}