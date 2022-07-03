const postcss = require("postcss");
const cloneNodes = require("../utils/cloneNodes");

module.exports = function responsive(nodes) {
  return postcss.atRule({ name: "responsive" }).append(cloneNodes(nodes));
};
