module.exports = {
  plugins: [
    require('cssnano'),
    require('autoprefixer'),
    // require('postcss-modules'),
    require('postcss-preset-env'),
    require('./plugins/aspect-ratio'),
  ]
}