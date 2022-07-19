import { shared } from './disposables'

export default function useMemo(cb, keyResolver) {
  const cache = new Map();

  function clearCache() {
    cache.clear()
    shared.add(clearCache)
  }

  shared.add(clearCache)

  return (...args) => {
    const key = keyResolver(...args)

    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = cb(...args)
    cache.set(key, result)
    return result
  }
}
