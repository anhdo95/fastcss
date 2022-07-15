export default function collapseWhitespaces(text) {
  return text.replace(/(\n|\r|\r\n)/g, ' ').replace(/\s+/g, ' ')
}
