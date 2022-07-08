module.exports = function textColors({ addUtilities, config: { colors, modules } }) {
  addUtilities(
    Object.keys(colors).reduce((classes, color) => {
      return {
        ...classes,
        [`.text-${color}`]: {
          color: colors[color],
        },
      }
    }, {}),
    modules.textColors
  )
}
