import functions from 'postcss-functions'

export default function evaluateFunctions(config) {
  return functions({
    functions: {
      config(path) {
        let value = config

        for (const k of path.replace(/['"]/g, '').split('.')) {
          value = value[k]
        }

        return value
      },
    },
  })
}
