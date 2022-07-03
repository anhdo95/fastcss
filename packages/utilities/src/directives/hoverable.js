const postcss = require("postcss");
const cloneNodes = require("../utils/cloneNodes");

module.exports = function hoverable(nodes) {
  return postcss.atRule({ name: "hoverable" }).append(cloneNodes(nodes));
};
