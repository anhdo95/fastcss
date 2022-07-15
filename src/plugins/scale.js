import createUtilityPlugin from '../utils/createUtilityPlugin'

export default function scale() {
  return createUtilityPlugin('scale', [
    ['scale', ['--transform-scale-x', '--transform-scale-y']],
    ['scale-x', ['--transform-scale-x']],
    ['scale-y', ['--transform-scale-y']],
  ])
}
