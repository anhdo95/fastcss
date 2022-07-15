export default function defaults(target, ...sources) {
  for (const source of sources)
    for (const k in source) {
      if (!target.hasOwnProperty(k)) {
        target[k] = source[k]
      }

      for (const k in Object.getOwnPropertySymbols(source)) {
        if (!target.hasOwnProperty(k)) {
          target[k] = source[k]
        }
      }
    }

  return target
}
