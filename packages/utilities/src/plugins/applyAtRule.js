const postcss = require('postcss')
const cloneNodes = require("../utils/cloneNodes");
const escapeSelector = require('../utils/escapeSelector');

module.exports = function applyAtRules(root) {
  function findNodesBySelector(selector) {
    const matches = [];
    root.walkRules(rule => {
      if (rule.selector === selector) {
        matches.push(...cloneNodes(rule.nodes))
      }
    })
    return matches
  }

  root.walkAtRules('apply', atRule => {
    const classes = postcss.list.space(atRule.params)

    classes.forEach((className) => {
      const selector = `.${className}`
      const matches = findNodesBySelector(escapeSelector(selector))

      if (!matches.length) {
        throw atRule.error(`Unkown selector ${selector}`)
      }

      atRule.before(matches)
    })

    atRule.remove()
  })
}
