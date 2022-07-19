export default function useMemo(cb, keyResolver) {
  const map = new Map();

  return (...args) => {
    const key = keyResolver(...args)

    if (map.has(key)) {
      return map.get(key)
    }

    const result = cb(...args)
    map.set(key, result)
    return result
  }
}
