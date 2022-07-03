const cloneNodes = require("../utils/cloneNodes");

module.exports = function substituteHoverable(root) {
  root.walkAtRules("hoverable", (atRule) => {
    atRule.walkRules(rule => {
      rule.selectors = [
        rule.selector,
        `.hover\\:${rule.selector.slice(1)}:hover`,
        `.hover\\:${rule.selector.slice(1)}:focus`,
      ]
    })

    atRule.before(cloneNodes(atRule.nodes))
    atRule.remove()
  });
};
