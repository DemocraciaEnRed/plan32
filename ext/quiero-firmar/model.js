var db = require('democracyos-db')
var mongoose = require('mongoose')

var SignatureSchema = new mongoose.Schema({
  savedOnSpreadsheet: {
    type: Boolean,
    default: false
  },
  data: {
    firstname: {
      type: String,
      trim: true,
      required: true,
      validate: lengthValidator(255)
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
      validate: lengthValidator(255)
    },
    dni: {
      type: Number,
      min: 1,
      required: true,
      max: 999999999
    },
    city: {
      type: String,
      trim: true,
      validate: lengthValidator(255)
    }
  }
},{
  collection: 'plan32-signatures'
})

SignatureSchema.index({'data.dni': 1}, {unique: true, dropDups: true})

function lengthValidator (max) {
  return {
    validator: function (val) {
      val = val || ''
      return val && val.length < max
    },
    message: 'Invalid value length.'
  }
}

module.exports = db.getDefaultConnection().model('Signature', SignatureSchema)
