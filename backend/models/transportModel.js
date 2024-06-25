const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transportSchema = new Schema({
    
  vehicle_number: {
    type: String,
    required: true
  },
  vehicle_type: {
    type: String,
    required: true
  },
  vehicle_brandName: {
    type: String,
    required: true
  },
  vehicle_condition: {
    type: String,
    required: true
  },
  vehicle_serviceStatus: {
    type: String,
    required: true
  },
  vehicle_availability: {
    type: String,
    required: true
  },
  driver_name: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('transport', transportSchema)