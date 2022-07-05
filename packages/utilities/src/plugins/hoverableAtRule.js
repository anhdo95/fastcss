const cloneNodes = require("../utils/cloneNodes");

module.exports = function hoverableAtRule(root) {
  root.walkAtRules("hoverable", (atRule) => {
    atRule.walkRules(rule => {
      rule.selectors = [
        rule.selector,
        `.hover\\:${rule.selector.slice(1)}:hover`,
      ]
    })

    atRule.before(cloneNodes(atRule.nodes))
    atRule.remove()
  });
};
