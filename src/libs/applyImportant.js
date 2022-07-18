export default function applyImportant(config) {
  return function (root) {
    if (!config.important) return

    root.walkDecls((decl) => (decl.important = true))
  }
}
