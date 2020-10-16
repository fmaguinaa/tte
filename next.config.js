/* eslint-disable */
const withCss = require('@zeit/next-css')

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {}
}

module.exports = withCss({
  webpack: function (config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    }, { test: /\.scss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] })
    return config
  },
  target: 'serverless'
})
