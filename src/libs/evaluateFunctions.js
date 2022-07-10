const functions = require('postcss-functions')

module.exports = function evaluateFunctions(config) {
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
