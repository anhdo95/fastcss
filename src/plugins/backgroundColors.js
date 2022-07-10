module.exports = function backgroundColors({ addUtilities, config: { colors, modules } }) {
  addUtilities(
    Object.keys(colors).reduce((classes, color) => {
      return {
        ...classes,
        [`.bg-${color}`]: {
          'background-color': colors[color],
        },
      }
    }, {}),
    modules.backgroundColors
  )
}
