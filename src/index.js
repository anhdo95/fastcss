import postcss from 'postcss'
import postcssPresetEnv from 'postcss-preset-env'

import expandFastAtRules from './libs/expandFastAtRules'
import evaluateFunctions from './libs/evaluateFunctions'
import expandApplyAtRules from './libs/expandApplyAtRules'
import formatNodes from './libs/formatCSS'
import collapseAdjectRules from './libs/collapseAdjectRules'
import setupContext from './utils/setupContext'

module.exports = (configPath) => {
  return {
    postcssPlugin: 'fastcss',
    plugins: [
      function (root, result) {
        const context = setupContext(configPath)(root, result)

        return postcss([
          expandFastAtRules(context),
          expandApplyAtRules(context),
          evaluateFunctions(context.fastConfig),
          collapseAdjacentRules(context),
          formatNodes,
          postcssPresetEnv,
        ]).process(root, { from: undefined })
      }
    ],
  }
}

module.exports.postcss = true
