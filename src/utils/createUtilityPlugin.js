function className(prefixClass, key) {
  if (key === 'default') {
    return prefixClass
  }

  if (key.startsWith('-')) {
    return `-${prefixClass}${key}`
  }

  return `${prefixClass}-${key}`
}

export default function createUtilityPlugin(themeKey, utilityVariations) {
  return function ({ addUtilities, e, theme, variants }) {
    const utilities = utilityVariations.map(([prefixClass, properties]) => {
      return Object.entries(theme(themeKey)).map(([key, value]) => {
        return {
          [`.${e(className(prefixClass, key))}`]: properties.reduce(
            (props, property) => {
              return {
                ...props,
                [property]: value,
              }
            },
            {}
          ),
        }
      })
    })

    addUtilities(utilities, variants(themeKey))
  }
}
