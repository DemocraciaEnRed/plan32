var path = require('path')
var config = require('lib/config')
var clientConfig = require('lib/config/client')
var translations = require('lib/translations')
var setDefaultForum = require('lib/forum-middlewares').setDefaultForum

var html = path.resolve(__dirname, 'index.jade')

module.exports = function layout (req, res, next) {
  setDefaultForum(req, res, renderLayout.bind(renderLayout, req, res, next))
}

module.exports.setTemplate = function setTemplate (location) {
  html = location
}

function renderLayout (req, res) {
  var locale = req.locale

  res.render(html, {
    config: config,
    client: clientConfig,
    locale: locale,
    defaultForum: req.defaultForum,
    translations: translations[locale]
  })
}
