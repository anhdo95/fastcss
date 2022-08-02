export default function () {
  return function transform({ matchdUtilities, variants }) {
    matchdUtilities({
      '.transform': {
        '--fast-translate-x': '0',
        '--fast-translate-y': '0',
        '--fast-rotate': '0',
        '--fast-scale-x': '1',
        '--fast-scale-y': '1',
        transform: [
          'translateX(var(--fast-translate-x))',
          'translateY(var(--fast-translate-y))',
          'rotate(var(--fast-rotate))',
          'scaleX(var(--fast-scale-x))',
          'scaleY(var(--fast-scale-y))',
        ].join(' '),
      },
    })
  }
}
