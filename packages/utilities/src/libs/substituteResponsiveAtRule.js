const postcss = require("postcss");
const cloneNodes = require("../utils/cloneNodes");

module.exports = function substituteResponsive(root, { config }) {
  const rules = [];

  root.walkAtRules("responsive", (atRule) => {
    rules.push(...cloneNodes(atRule.nodes));
    atRule.before(rules);
    atRule.remove();
  });

  Object.keys(config.screens).forEach((screen) => {
    const mediaAtRule = postcss
      .atRule({
        name: "media",
        params: `(--${screen})`,
      })
      .append(
        rules.map((rule) =>
          rule.clone({
            selectors: rule.selectors.map(selector => `.${screen}\\:${selector.slice(1)}`),
          })
        )
      );

    root.append(mediaAtRule);
  });
};
