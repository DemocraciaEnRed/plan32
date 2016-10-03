var debug = require('debug')
var GoogleSpreadsheet = require('google-spreadsheet')

var log = debug('democracyos:plan32:quiero-firmar:spreadsheet')

var loaded = false

var googleClientEmail = process.env.PLAN32_GOOGLE_CLIENT_EMAIL ||
  log('Missing PLAN32_GOOGLE_CLIENT_EMAIL environment variable.')
var googlePrivateKey = process.env.PLAN32_GOOGLE_PRIVATE_KEY ||
  log('Missing PLAN32_GOOGLE_PRIVATE_KEY environment variable.')
var googleDocId = process.env.PLAN32_GOOGLE_DOC_ID ||
  log('Missing PLAN32_GOOGLE_DOC_ID environment variable.')

var doc
var sheet

initiliaze()

function save (signature) {
  if (!loaded) {
    log('Couldn\'t save signature to spreadsheet with dni: ', signature.data.dni, err)
    return
  }

  sheet.addRow(signature.get('data'), function (err) {
    if (err) {
      log('Couldn\'t save signature to spreadsheet with dni: ', signature.data.dni, err)
      return
    }

    log('Signature saved on spreadsheet for dni: ', signature.data.dni)

    signature.savedOnSpreadsheet = true
    signature.save()
  })
}

function initiliaze () {
  if (!googleDocId) {
    log('Not loading google spreadsheets')
    return
  }

  doc = new GoogleSpreadsheet(googleDocId)

  log('Logging in to google API')

  doc.useServiceAccountAuth({
    client_email: googleClientEmail,
    private_key: googlePrivateKey
  }, function loadSheet (err) {
    if (err) {
      log('Couldn\'t connect to Google Spreadsheet.', err)
      return
    }

    log('Logged in to google API')

    doc.getInfo(function(err, info) {
      if (err) {
        log('Couldn\'t get doc info.', err)
        return
      }

      log('Google Spreadsheet loaded.')
      sheet = info.worksheets[0]
      loaded = true
    })
  })
}

module.exports = {
  save: save
}
