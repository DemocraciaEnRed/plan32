var express = require('express')

var app = module.exports = express()

app.get('/quiero-firmar', require('lib/layout'))
