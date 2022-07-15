import defineClasses from '../src/utils/defineClasses'
import cw from '../src/utils/collapseWhitespaces'

describe('defineClasses', () => {
  it('generates a set of helper classes from a config', () => {
    const output = defineClasses({
      flex: {
        display: 'flex',
      },
      'flex-center': {
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
      },
    })

    expect(cw(output[0].toString())).toBe('.flex { display: flex }')
    expect(cw(output[1].toString())).toBe(
      '.flex-center { display: flex; justify-content: center; align-items: center }'
    )
  })

  it('escapes non-standard characters in selectors', () => {
    const output = defineClasses({
      'w-1/2': {
        width: '50%',
      },
      'h-5/6': {
        width: 'calc(100% / 6 * 5)',
      },
    })

    expect(cw(output[0].toString())).toBe('.w-1\\/2 { width: 50% }')
    expect(cw(output[1].toString())).toBe('.h-5\\/6 { width: calc(100% / 6 * 5) }')
  })
})
