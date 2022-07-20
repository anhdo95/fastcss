import createUtilityPlugin from '../utils/createUtilityPlugin'

export default function backgroundOpacity() {
  return createUtilityPlugin('backgroundOpacity', [['bg-opacity', ['--bg-opacity']]])
}
