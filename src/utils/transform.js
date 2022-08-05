import selectorParser from 'postcss-selector-parser'

export function updateAllClasses(selector, updateClass) {
  const parser = selectorParser(selectors => {
    selectors.walkClasses(sel => {
      sel.value = updateClass(sel.value, {
        withPseudo(className, pseudo) {
          sel.parent.insertAfter(sel, selectorParser.pseudo({ value: `:${pseudo}` }))
          return className
        }
      })
    })
  })

  return parser.processSync(selector)
}

export function transformAllClasses(transformClass) {
  return ({ container }) => {
    container.walkRules(rule => {
      rule.selector = updateAllClasses(rule.selector, transformClass)
      return rule
    })
  }
}
