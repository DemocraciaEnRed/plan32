var express = require('express')

var app = module.exports = express()

app.get('/proyecto-de-ley', require('lib/layout'))
