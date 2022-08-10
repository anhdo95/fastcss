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
      function (root) {
        console.log('\n')
        console.time('JIT TOTAL')
        return root
      },
      function (root, result) {
        const context = setupContext(pathOrConfig)(root, result)

        if (context.userConfigPath !== null) {
          result.messages.push({
            type: 'dependency',
            plugin: 'fastcss',
            parent: result.opts.from,
            file: context.userConfigPath,
          })
        }

        return postcss([
          expandFastAtRules(context),
          expandApplyAtRules(context),
          evaluateFunctions(context.fastConfig),
          collapseAdjacentRules(context),
          formatNodes,
        ]).process(root, { from: undefined })
      },
      function (root) {
        console.timeEnd('JIT TOTAL')
        console.log('\n')
        return root
      },
    ],
  }
}

module.exports.postcss = true
