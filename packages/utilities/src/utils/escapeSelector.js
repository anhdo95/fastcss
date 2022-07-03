module.exports = function escapeSelector(selector) {
  return selector.replace(/([^a-zA-Z0-9\-.])/g, '\\$1')
}
