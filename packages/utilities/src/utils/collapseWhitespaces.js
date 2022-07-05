module.exports = function collapseWhitespaces(text) {
  return text.replace(/[\n\r]/g, ' ').replace(/\s+/g, ' ')
}
