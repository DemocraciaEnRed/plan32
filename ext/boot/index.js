var express = require('express')

var app = module.exports = express()

app.use(require('ext/letsencrypt'))
app.use(require('ext/home'))
app.use(require('ext/que-es'))
app.use(require('ext/quiero-firmar'))

require('ext/layout')
