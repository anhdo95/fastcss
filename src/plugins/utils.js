export function asClass(prefix) {
  return `.${prefix}`
}

export function nameClass(prefix, modifier) {
  if (/^default$/i.test(modifier)) {
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
