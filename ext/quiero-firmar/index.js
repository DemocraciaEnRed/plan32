var debug = require('debug')
var express = require('express')
var Signature = require('./model')
var spreadsheet = require('./spreadsheet')

var log = debug('democracyos:plan32:quiero-firmar')

var app = module.exports = express()

app.get('/quiero-firmar', require('lib/layout'))

app.post('/quiero-firmar/sign',
  checkUniqueSignature,
  function saveSignature (req, res, next) {
    Signature.create({
      data: req.body
    }, function (err, signature) {
      if (err) return res.status(500).end()

      res.json(200, {status: 200})

      spreadsheet.save(signature)
    })
  }
)

function checkUniqueSignature (req, res, next) {
  var data = req.body || {}

  if (!data.dni) return res.json(400, {
    status: 400,
    error: {
      code: 'BAD_REQUEST'
    }
  })

  Signature.find({
    'data.dni': data.dni
  }).limit(1).exec(function (err, signature) {
    if (err) return res.status(500).end()

    if (signature.length) return res.json(400, {
      status: 400,
      error: {
        code: 'ALREADY_SIGNED'
      }
    })

    next()
  })
}
