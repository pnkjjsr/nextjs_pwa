// default config entry file with respective configuration values
// this entry is going to be used in `src` across app and api

const envProperties = {}
const prod = process.env.NODE_ENV === 'production'

// assigned with `process.env` or fallback to default port value
// when one of the following is not defined in '.env' file
if (!process.env.PORT) {
  envProperties.PORT = +process.env.PORT || 3000;
}

if (!process.env.API_PORT) {
  envProperties.API_PORT = +process.env.API_PORT || 5000;
}

module.exports = {
  // export built environment properties for universal usage
  ENV: envProperties,

  // export named `NODE` as part of config
  NODE: prod
};