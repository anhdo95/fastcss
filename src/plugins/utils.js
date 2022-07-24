export function asClass(prefix, modifier) {
  return `.${prefix}${modifier}`
}

export function nameClass(prefix, modifier) {
  if (modifier.test(/^default$/i)) {
    return asClass(prefix)
  }

  if (modifier.startsWith('-')) {
    return asClass(`-${prefix}${modifier}`)
  }

  return asClass(`${prefix}-${modifier}`)
}

export function asValue(key, styles) {
  return styles[key]
}
