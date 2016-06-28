var express = require('express')

var app = module.exports = express()

app.get('/que-es', require('lib/layout'))
