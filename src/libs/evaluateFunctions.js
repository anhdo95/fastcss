import functions from 'postcss-functions'

export default function evaluateFunctions(config) {
  return functions({
    functions: {
      theme(path) {
        let value = config.theme

        for (const k of path.replace(/['"]/g, '').split('.')) {
          value = value[k]
        }

        return value
      },
    },
  })
}
