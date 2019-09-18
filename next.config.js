const withOffline = require('next-offline')
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withPlugins = require("next-compose-plugins");
const withImages = require('next-images');
const path = require('path')

const nextConfig = {
  env: {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
  dontAutoRegisterSw: true, // since we want runtime registration,
  webpack(config, options) {
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['utils'] = path.join(__dirname, 'utils')
    config.resolve.alias['static'] = path.join(__dirname, 'static')
    config.resolve.alias['functions'] = path.join(__dirname, 'functions')

    return config
  }
}

module.exports = withPlugins([
  withCSS,
  withSass,
  withOffline,
  withImages
], nextConfig)