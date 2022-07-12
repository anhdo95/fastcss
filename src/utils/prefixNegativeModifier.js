module.exports = function prefixNegativeModifier(base, modifier) {
  return modifier.startsWith('-')
    ? `-${base}-${modifier.slice(1)}`
    : `${base}-${modifier}`
}
