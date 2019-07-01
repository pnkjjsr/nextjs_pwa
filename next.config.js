const webpack = require('webpack');
const withOffline = require('next-offline')
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([
  withCSS,
  withSass,
  withOffline
]), {
  // next-offline options:
  dontAutoRegisterSw: true, // since we want runtime registration
}