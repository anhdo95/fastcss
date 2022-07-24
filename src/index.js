import postcss from 'postcss'
import postcssPresetEnv from 'postcss-preset-env'

import useAtRule from './libs/useAtRule'
import evaluateFunctions from './libs/evaluateFunctions'
import applyAtRule from './libs/applyAtRule'
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

        postcss([
          useAtRule(context),
          evaluateFunctions(context),
          variantsAtRule(context),
          responsiveAtRule(context),
          applyAtRule(context),
          applyImportant(context),
          formatNodes,
          postcssPresetEnv,
        ]).process(root, { from: undefined })
      }
    ],
  }
}

module.exports.postcss = true
