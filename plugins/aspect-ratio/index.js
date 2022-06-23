/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  return {
    postcssPlugin: "postcss-aspect-ratio",

    Declaration: {
      "aspect-ratio"(decl, { Rule }) {
        const [ratioWidth, ratioHeight] = decl.value.split("/");
        if (!ratioWidth || !ratioHeight) return;

        const percentage =
          (Number(ratioHeight) * 100) / Number(ratioWidth) + "%";
        decl.after(`padding-top: ${percentage}`);
        decl.after("overflow: hidden ");

        const firstChildrenRule = new Rule({
          selector: `${decl.parent.selector} > *`,
        });
        firstChildrenRule.append("position: absolute; top: 0; left: 0;");
        decl.parent.after(firstChildrenRule);

        const relative = decl.clone({
          prop: "position",
          value: "relative",
        });
        decl.replaceWith(relative);
      },
    },
  };
};

module.exports.postcss = true;
