const rewireTypescript = require('react-app-rewire-typescript')
const { injectBabelPlugin } = require('react-app-rewired')
const getWorkspaces = require('get-yarn-workspaces')

function webpack(config, env, from) {
  config = rewireTypescript(config, env)
  const babel = config.module.rules
    .find(rule => 'oneOf' in rule)
    .oneOf.find(rule => /babel-loader/.test(rule.loader))

  if (!Array.isArray(babel.include)) {
    babel.include = [babel.include]
  }

  babel.include = babel.include.concat(getWorkspaces(from))

  return config
}

function jest(config, env) {
  config.transformIgnorePatterns = [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$',
  ]
  return config
}

module.exports = {
  webpack,
  jest,
}
