var merge = require('mout/object/merge')
var translations = require('lib/translations')
var overrides = require('./lib/es.json')

translations.es = merge(translations.es, overrides)
