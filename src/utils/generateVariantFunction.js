export default function generateVariantFunction(generator) {
  return (atRule) => {
    const cloned = atRule.clone()

    cloned.walkRules((rule) => {
      rule.selector = generator({
        className: rule.selector.slice(1),
        separator: '\\:'
      })
    })

    atRule.before(cloned.nodes)
  }
}
