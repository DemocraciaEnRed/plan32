var express = require('express')

var app = module.exports = express()

if (process.env.LETSENCRYPT_KEY) {
  app.param('key', function letsencryptParamKey (req, res, next, key) {
    if (key === process.env.LETSENCRYPT_KEY) return next()
    res.status(400).send()
  })

  app.get('/.well-known/acme-challenge/:key', function letsencrypt (req, res) {
    res.send(process.env.LETSENCRYPT_TOKEN)
  })
}
