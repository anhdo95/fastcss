export default function () {
  return function transform({ addUtilities, variants }) {
    addUtilities(
      {
        '.transform': {
          '--transform-translate-x': '0',
          '--transform-translate-y': '0',
          '--transform-rotate': '0',
          '--transform-scale-x': '1',
          '--transform-scale-y': '1',
          transform: [
            'translateX(var(--transform-translate-x))',
            'translateY(var(--transform-translate-y))',
            'rotate(var(--transform-rotate))',
            'scaleX(var(--transform-scale-x))',
            'scaleY(var(--transform-scale-y))',
          ].join(' '),
        },
      },
      variants('transform')
    )
  }
}
