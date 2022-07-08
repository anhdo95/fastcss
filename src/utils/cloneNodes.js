module.exports = function cloneNodes(nodes) {
  return nodes.map(node => node.clone())
}