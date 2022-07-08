module.exports = function defaults(target, source) {
  for (let k in source) {
    if (!target.hasOwnProperty(k)) {
      target[k] = source[k]
    }

    for (let k in Object.getOwnPropertySymbols(source)) {
      if (!target.hasOwnProperty(k)) {
        target[k] = source[k]
      }
    }
  }

  return target
}
