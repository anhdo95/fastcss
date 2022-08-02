import fs from 'fs'
import fastGlob from 'fast-glob'
import { bigSign } from '../utils'
import generateRules from '../utils/generateRules'
import cloneNodes from '../utils/cloneNodes'

function addCandidatesFiles(changedFiles, patterns) {
  patterns.forEach((pattern) => {
    changedFiles.add(...fastGlob.sync(pattern))
  })
}

function addClassCandidates(changedFiles, candidates, seen) {
  function extractor(content) {
    return (
      content.match(/[^<>"'`\s.(){}[\]#=%$]*[^<>"'`\s.(){}[\]#=%:$]/g) || []
    )
  }

  for (const file of changedFiles) {
    const content = fs.readFileSync(file, 'utf-8')

    for (let line of content.split('\n')) {
      line = line.trim()

      if (seen.has(line)) {
        continue
      }
      seen.add(line)

      extractor(line).forEach((match) => candidates.add(match))
    }
  }
}

function buildStylesheet(rules, context) {
  const sortedRules = rules.sort(([a], [b]) => bigSign(a - b))

  const returnValue = {
    base: new Set(),
    components: new Set(),
    utilities: new Set(),
    screens: new Set(),
  }

  for (const [sort, rule] of sortedRules) {
    if (sort >= context.minimumScreen) {
      returnValue.screens.add(rule)
      continue
    }

    if (sort & context.layerOrder.base) {
      returnValue.base.add(rule)
      continue
    }

    if (sort & context.layerOrder.components) {
      returnValue.components.add(rule)
      continue
    }

    if (sort & context.layerOrder.utilities) {
      returnValue.utilities.add(rule)
      continue
    }
  }

  return returnValue
}

export default function expandFastAtRules(context) {
  return function (root) {
    let foundFast = false
    const layerNodes = {
      base: null,
      components: null,
      utilities: null,
      screens: null,
    }

    root.walkAtRules('fast', (atRule) => {
      foundFast = true

      if (atRule.params === 'base') {
        layerNodes.base = atRule
      }

      if (atRule.params === 'components') {
        layerNodes.components = atRule
      }

      if (atRule.params === 'utilities') {
        layerNodes.utilities = atRule
      }

      if (atRule.params === 'screens') {
        layerNodes.screens = atRule
      }
    })

    if (!foundFast) {
      return root
    }

    addCandidatesFiles(context.changedFiles, context.candidateFiles)

    // Find potential rules in the changed files
    const candidates = new Set(['*'])
    const seen = new Set()
    const classCacheCount = context.classCache.size

    addClassCandidates(context.changedFiles, candidates, seen)
    const rules = generateRules(candidates, context)

    if (
      context.stylesheetCache === null ||
      classCacheCount !== context.classCache.size
    ) {
      rules.forEach((rule) => context.ruleCache.add(rule))
      context.stylesheetCache = buildStylesheet([...context.ruleCache], context)
    }

    const {
      base: baseNodes,
      components: componentsNodes,
      utilities: utilitiesNodes,
      screens: screensNodes,
    } = context.stylesheetCache

    if (layerNodes.base) {
      layerNodes.base.before(cloneNodes([...baseNodes]))
      layerNodes.base.remove()
    }

    if (layerNodes.components) {
      layerNodes.components.before(cloneNodes([...componentsNodes]))
      layerNodes.components.remove()
    }

    if (layerNodes.utilities) {
      layerNodes.utilities.before(cloneNodes([...utilitiesNodes]))
      layerNodes.utilities.remove()
    }

    if (layerNodes.screens) {
      layerNodes.screens.before(cloneNodes([...screensNodes]))
      layerNodes.screens.remove()
    } else {
      root.append(cloneNodes([...screensNodes]))
    }
  }
}
