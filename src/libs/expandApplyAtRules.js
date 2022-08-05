import postcss from 'postcss'

function partitionApplyParents(root) {
  const applyParents = new Set()

  root.walkAtRules('apply', rule => {
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

export default function expandApplyAtRules(context) {
  return (root) => {
    partitionApplyParents(root)
  }
}
