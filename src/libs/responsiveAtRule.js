import postcss from 'postcss'
import cloneNodes from '../utils/cloneNodes'

export default function responsiveAtRule(config) {
  return function(root) {
    const responsive = postcss.root()

    root.walkAtRules('responsive', (atRule) => {
      responsive.append(cloneNodes(atRule.nodes))
      atRule.before(cloneNodes(atRule.nodes))
      atRule.remove()
    })

    if (!responsive.nodes.length) {
      return
    }

    Object.keys(config.theme.screens).forEach((screen) => {
      const mediaAtRule = postcss
        .atRule({
          name: 'media',
          params: `(min-width: ${config.theme.screens[screen]})`,
        })
        .append(
          responsive.nodes.map((rule) =>
            rule.clone({
              selectors: rule.selectors.map(
                (selector) => `.${screen}\\:${selector.slice(1)}`
              ),
            })
          )
        )

      root.append(mediaAtRule)
    })
  }
}
