var express = require('express')

var app = module.exports = express()

app.use(require('ext/home'))

require('ext/layout')