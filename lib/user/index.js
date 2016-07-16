var express = require('express')
var utils = require('lib/utils')
var accepts = require('lib/accepts')
var restrict = utils.restrict
var pluck = utils.pluck
var api = require('lib/db-api')
var log = require('debug')('democracyos:user')
var config = require('lib/config')

var app = module.exports = express()

/**
 * Limit request to json format only
 */

app.use(accepts('application/json'))

function initPrivileges (req, res, next) {
  if (req.user) req.user.privileges = {}
  next()
}

function canCreate (req, res, next) {
  if (config.restrictForumCreation) {
    req.user.privileges.canCreate = req.user.staff
  } else {
    req.user.privileges.canCreate = true
  }

  next()
}

function canManage (req, res, next) {
  if (req.user.privileges.canCreate) {
    req.user.privileges.canManage = true
    return next()
  }

  var options = {}
  options['privileges.canChangeTopics']
  api.forum.all(options, function (err, forums) {
    if (err) return next(err)
    req.user.privileges.canManage = !!forums.length
    next()
  })
}

app.get('/user/me', restrict, initPrivileges, canCreate, canManage, function (req, res) {
  log('Request user/me')

  log('Serving user %j', req.user.id)
  res.json(api.user.expose.confidential(req.user))
})

app.get('/user/search', restrict, function (req, res) {
  var q = req.param('q')

  log('Request user/search %j', q)

  api.user.search(q, function (err, users) {
    if (err) return _handleError(err, req, res)

    log('Serving users %j', pluck(users, 'id'))
    res.json(users.map(api.user.expose.ordinary))
  })
})

app.get('/user/lookup', function (req, res) {
  var ids = req.param('ids')

  log('Request user/lookup %j', ids)

  if (!ids) {
    log('Cannot process without ids')
    return res.json(500, {})
  }

  api.user.lookup(ids.split(','), function (err, users) {
    if (err) return _handleError(err, req, res)

    log('Serving users %j', pluck(users, 'id'))
    res.json(users.map(api.user.expose.ordinary))
  })
})

// This is a temporary hack while lookinf for a better solution to
// this error: 414 Request-URI Too Large
app.post('/user/lookup', function (req, res) {
  var ids = req.param('ids')

  log('Request user/lookup %j', ids)

  if (!ids) {
    log('Cannot process without ids')
    return res.json(500, {})
  }

  api.user.lookup(ids, function (err, users) {
    if (err) return _handleError(err, req, res)

    log('Serving users %j', pluck(users, 'id'))
    res.json(users.map(api.user.expose.ordinary))
  })
})

app.get('/user/:id', restrict, function (req, res) {
  log('Request user/%s', req.params.id)

  api.user.get(req.params.id, function (err, user) {
    if (err) return _handleError(err, req, res)

    log('Serving user %j', user.id)
    res.json(api.user.expose.ordinary(user))
  })
})

function _handleError (err, req, res) {
  res.format({
    html: function () {
      // this should be handled better!
      // maybe with flash or even an
      // error page.
      log('Error found with html request %j', err)
      res.redirect('back')
    },
    json: function () {
      log('Error found: %j', err)
      res.json({ error: err })
    }
  })
}
