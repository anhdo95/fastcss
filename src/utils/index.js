export function isFunction(fn) {
  return typeof fn === 'function'
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

export function isPlainObject(obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return false
  }

  const prototype = Object.getPrototypeOf(obj)
  return prototype === null || prototype === Object.prototype
}

export function bigSign(bigIntValue) {
  return (bigIntValue > 0n) - (bigIntValue < 0n)
}
