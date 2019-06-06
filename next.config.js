const withOffline = require('next-offline')
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')

const nextConfig = {
  // next-offline options:
  dontAutoRegisterSw: true, // since we want runtime registration

  exportPathMap: async function (defaultPathMap) {
    return {
      '/': {
        page: '/'
      }
    };
  },
}

module.exports = withSass(withCSS(withOffline(nextConfig)));