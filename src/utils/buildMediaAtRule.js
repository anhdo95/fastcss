import postcss from 'postcss'

export default function buildMediaAtRule(screen) {
  return postcss.atRule({
    name: 'media',
    params: `(min-width: ${screen})`,
  })
}
