import postcss from 'postcss'

import expandFastAtRules from './libs/expandFastAtRules'
import evaluateFunctions from './libs/evaluateFunctions'
import expandApplyAtRules from './libs/expandApplyAtRules'
import formatNodes from './libs/formatCSS'
import collapseAdjacentRules from './libs/collapseAdjacentRules'
import setupContext from './utils/setupContext'

module.exports = (pathOrConfig) => {
  return {
    postcssPlugin: 'fastcss',
    plugins: [
      function (root, result) {
        const context = setupContext(pathOrConfig)(root, result)

        return postcss([
          expandFastAtRules(context),
          expandApplyAtRules(context),
          evaluateFunctions(context.fastConfig),
          collapseAdjacentRules(context),
          formatNodes,
        ]).process(root, { from: undefined })
      }
    ],
  }
}

module.exports.postcss = true
