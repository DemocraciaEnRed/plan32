var debug = require('debug')
var GoogleSpreadsheet = require('google-spreadsheet')

var log = debug('democracyos:plan32:quiero-firmar:spreadsheet')

var googleClientEmail = process.env.PLAN32_GOOGLE_CLIENT_EMAIL ||
  throw new Error('Missing PLAN32_GOOGLE_CLIENT_EMAIL environment variable.')
var googlePrivateKey = process.env.PLAN32_GOOGLE_PRIVATE_KEY ||
  throw new Error('Missing PLAN32_GOOGLE_PRIVATE_KEY environment variable.')
var googleDocId = process.env.PLAN32_GOOGLE_DOC_ID ||
  throw new Error('Missing PLAN32_GOOGLE_DOC_ID environment variable.')

var doc = new GoogleSpreadsheet(googleDocId)
var sheet

log('Logging in to google API')

doc.useServiceAccountAuth({
  client_email: googleClientEmail,
  private_key: googlePrivateKey
}, function loadSheet (err) {
  if (err) {
    log('Couldn\'t connect to Google Spreadsheet.', err)
    return
  }

  doc.getInfo(function(err, info) {
    if (err) {
      log('Couldn\'t get doc info.', err)
      return
    }

    log('Google Spreadsheet loaded.')
    sheet = info.worksheets[0]
  })
})


function save (signature, cb) {
  sheet.addRow(signature.get('data'), function (err) {
    if (err) {
      log('Couldn\'t save signature to spreadsheet with dni: ', signature.dni, err)
      return
    }

    log('Signature saved on spreadsheet for dni: ', signature.dni)

    signature.savedOnSpreadsheet = true
    signature.save()
  })
}

module.exports = {
  save: save
}
