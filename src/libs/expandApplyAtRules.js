import postcss from 'postcss'
import { bigSign, extractApplyCandidates } from '../utils'
import { resolveMatches } from '../utils/generateRules'

function partitionApplyParents(root) {
  const applyParents = new Set()

  root.walkAtRules('apply', (rule) => {
    applyParents.add(rule.parent)
  })

  for (const rule of applyParents) {
    const nodeGroups = []
    let lastGroup = []

    for (const node of rule.nodes) {
      if (node.type === 'atrule' && node.name === 'apply') {
        if (lastGroup.length) {
          nodeGroups.push(lastGroup)
          lastGroup = []
        }
        nodeGroups.push([node])
      } else {
        lastGroup.push(node)
      }
    }

    if (lastGroup.length) {
      nodeGroups.push(lastGroup)
    }

    if (nodeGroups.length === 1) continue

    for (const group of nodeGroups.reverse()) {
      const newParent = rule.clone({ nodes: [] })
      newParent.append(group)
      rule.after(newParent)
    }

    rule.remove()
  }
}

function buildApplyCache(candidates, context) {
  for (const candidate of candidates) {
    if (
      context.notClassCache.has(candidate) ||
      context.applyClassCache.has(candidate)
    ) {
      continue
    }

    if (context.classCache.has(candidate)) {
      context.applyClassCache.set(
        candidate,
        context.classCache
          .get(candidate)
          .map(([meta, rule]) => [meta, rule.clone])
      )
    }

    const matches = Array.from(resolveMatches(candidate, context))

    if (!matches.length) {
      continue
    }

    context.applyClassCache.set(candidate, matches)
  }

  return context.applyClassCache
}

function processApply(root, context) {
  const applyCandidates = new Set()
  const applies = []

  root.walkAtRules('apply', (rule) => {
    const [candidates] = extractApplyCandidates(rule.params)

    candidates.forEach((candidate) => applyCandidates.add(candidate))
    applies.push(rule)
  })

  if (!applies.length) return

  // fill up some caches
  const applyClassCache = buildApplyCache(applyCandidates, context)
  const perParentApplies = new Map()

  for (const apply of applies) {
    const candidates = perParentApplies.get(apply.parent) || []
    perParentApplies.set(apply.parent, candidates)

    const [applyCandidates, important] = extractApplyCandidates(apply.params)

    for (const applyCandidate of applyCandidates) {
      if (!applyClassCache.has(applyCandidate)) {
        throw apply.error(`The \`${applyCandidate}\` does not exist.`)
      }

      const rules = applyClassCache.get(applyCandidate)
      candidates.push([applyCandidate, important, rules])
    }
  }

  for (const [parent, candidates] of perParentApplies) {
    const siblings = []

    for (const [candidate, important, rules] of candidates) {
      for (const [meta, rule] of rules) {
        const root = postcss.root({ nodes: [rule] })
        root.walkRules((rule) => {
          rule.selector = parent.selector

          rule.walkDecls((decl) => {
            decl.important = important
          })
        })

        siblings.push([meta, root.nodes[0]])
      }
    }

    const nodes = siblings
      .sort(([a], [b]) => bigSign(a.sort - b.sort))
      .map(([_, rule]) => rule)

    parent.after(nodes)
  }

  for (const apply of applies) {
    apply.parent.remove()
  }
}

export default function expandApplyAtRules(context) {
  return (root) => {
    partitionApplyParents(root)
    processApply(root, context)
  }
}
