export default function registerConfigAsDependency(file) {
  return function(root, opts) {
    opts.messages.push({
      type: 'dependency',
      parent: root.source.input.file,
      file,
    });
  }
}
