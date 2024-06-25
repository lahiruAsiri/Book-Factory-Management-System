const mongoose = require('mongoose')

const Schema = mongoose.Schema

const machineSchema = new Schema({

  machine_number: {
    type: String,
    required: true
  },
  machine_name: {
    type: String,
    required: true
  },
  machine_condition: {
    type: String,
    required: true
  },
  machine_availableStatus: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('machine', machineSchema)