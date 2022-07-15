import createUtilityPlugin from '../utils/createUtilityPlugin'

export default function rotate() {
  return createUtilityPlugin('rotate', [['rotate', ['--transform-rotate']]])
}
