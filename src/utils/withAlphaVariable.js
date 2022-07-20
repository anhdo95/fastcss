import Color from 'color'

function toRgba(color) {
  return Color(color).rgb().array()
}

export default function withAlphaVariable({ color, property, variable }) {
  const [r, g, b, a] = toRgba(color)

  if (a !== undefined) {
    return {
      [property]: color
    }
  }

  return {
    [variable]: '1',
    [property]: `rgba(${r}, ${g}, ${b}, var(${variable}))`
  }
}
