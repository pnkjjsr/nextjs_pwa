const withOffline = require('next-offline')

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

module.exports = withOffline(nextConfig)