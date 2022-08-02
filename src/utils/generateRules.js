import { isFunction, isPlainObject } from '.'
import parseObjectStyles from './parseObjectStyles'

function* permutateCandidate(candidate, lastIndex = Infinity) {
  if (lastIndex < 0) {
    return
  }

  let dashIndex = 0

  if (lastIndex === Infinity && candidate.endsWith(']')) {
    const bracketIndex = candidate.lastIndexOf(']')

    // if character before `[` isn't a dash. It's not a dynamic class
    dashIndex =
      candidate[bracketIndex - 1] === '-' ? candidate[bracketIndex + 1] : -1
  } else {
    dashIndex = candidate.lastIndexOf('-', lastIndex)
  }

  if (dashIndex === -1) {
    return
  }

  const prefix = candidate.slice(0, dashIndex)
  const modifier = candidate.slice(dashIndex + 1)

  yield [prefix, modifier]
  yield* permutateCandidate(candidate, dashIndex - 1)
}

function* resolveMatchedPlugins(classCandidate, context) {
  if (context.candidateRuleCache.has(classCandidate)) {
    yield [context.candidateRuleCache.get(classCandidate), 'DEFAULT']
  }

  const prefix = context.fastConfig.prefix || ''
  const prefixLength = prefix.length
  let negative = false

  if (classCandidate[prefixLength] === '-') {
    negative = true
    classCandidate = prefix + classCandidate.slice(prefixLength + 1)
  }

  for (const [prefix, modifier] of permutateCandidate(classCandidate)) {
    if (context.candidateRuleCache.has(prefix)) {
      yield [
        context.candidateRuleCache.get(prefix),
        negative ? `-${modifier}` : modifier,
      ]
    }
  }
}

function parseRule(rule, cache, options = {}) {
  // PostCSS node
  if (!isPlainObject(rule) && !Array.isArray(rule)) {
    return [[rule], options]
  }

  if (!cache.has(rule)) {
    cache.set(rule, parseObjectStyles(rule))
  }

  return [cache.get(rule), options]
}

function* resolveMatches(candidate, context) {
  const separator = context.fastConfig.separator
  let [classCandidate, ...variants] = candidate.split(separator).reverse()
  let important = false

  if (classCandidate.startsWith('!')) {
    important = true
    classCandidate = classCandidate.slice(1)
  }

  for (const [plugins, modifier] of resolveMatchedPlugins(
    classCandidate,
    context
  )) {
    const matches = []

    for (const [sort, plugin] of plugins) {
      if (isFunction(plugin)) {
        for (const ruleSet of [].concat(
          plugin(modifier, { theme: context.fastConfig.theme })
        )) {
          const [rules, options] = parseRule(ruleSet, context.postCssNodeCache)
          for (const rule of rules) {
            matches.push([
              { ...sort, options: { ...sort.options, ...options } },
              rule,
            ])
          }
        }
      } else if (modifier === 'DEFAULT') {
        const ruleSet = plugin
        const [rules, options] = parseRule(ruleSet, context.postCssNodeCache)
        for (const rule of rules) {
          matches.push([
            { ...sort, options: { ...sort.options, ...options } },
            rule,
          ])
        }
      }
    }

    // matches = applyPrefix(matches, context)

    if (important) {
      // matches = applyImportant(matches, context)
    }

    for (const variant of variants) {
      // matches = applyVariants(matches, context)
    }

    for (const match of matches) {
      yield match
    }
  }
}

export default function generateRules(candidates, context) {
  const rules = []

  for (const candidate of candidates) {
    if (context.notClassCache.has(candidate)) {
      continue
    }

    if (context.classCache.has(candidate)) {
      rules.push(context.classCache.get(candidate))
      continue
    }

    const matches = Array.from(resolveMatches(candidate, context))

    if (matches.length === 0) {
      context.notClassCache.add(candidate)
      continue
    }

    context.classCache.set(candidate, matches)
    rules.push(matches)
  }

  return rules.flat().map(([{ sort, layer }, rule]) => {
    return [sort | context.layerOrder[layer], rule]
  })
}
