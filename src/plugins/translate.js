import createUtilityPlugin from '../utils/createUtilityPlugin'

export default function translate() {
  return createUtilityPlugin('translate', [
    ['translate-x', ['--transform-translate-x']],
    ['translate-y', ['--transform-translate-y']]
  ])
}
