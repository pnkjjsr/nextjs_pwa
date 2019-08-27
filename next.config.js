const withOffline = require('next-offline')
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withPlugins = require("next-compose-plugins");
const withImages = require('next-images');

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
}

module.exports = withPlugins([
  withCSS,
  withSass,
  withOffline,
  withImages
], nextConfig)