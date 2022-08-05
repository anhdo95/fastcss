import postcss from 'postcss'
import postcssPresetEnv from 'postcss-preset-env'

import expandFastAtRules from './libs/expandFastAtRules'
import evaluateFunctions from './libs/evaluateFunctions'
import expandApplyAtRules from './libs/expandApplyAtRules'
import variantsAtRule from './libs/variantsAtRule'
import responsiveAtRule from './libs/responsiveAtRule'
import formatNodes from './libs/formatCSS'
import applyImportant from './libs/applyImportant'
import setupContext from './utils/setupContext'

module.exports = (configPath) => {
  return {
    postcssPlugin: 'fastcss',
    plugins: [
      function (root, result) {
        const context = setupContext(configPath)(root, result)

        return postcss([
          expandFastAtRules(context),
          evaluateFunctions(context.fastConfig),
          expandApplyAtRules(context),
          // responsiveAtRule(context),
          // applyImportant(context),
          formatNodes,
          postcssPresetEnv,
        ]).process(root, { from: undefined })
      }
    ],
  }
}

module.exports.postcss = true
