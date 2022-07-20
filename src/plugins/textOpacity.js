import createUtilityPlugin from '../utils/createUtilityPlugin'

export default function textOpacity() {
  return createUtilityPlugin('textOpacity', [['text-opacity', ['--text-opacity']]])
}
