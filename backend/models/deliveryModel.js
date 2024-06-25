const mongoose = require('mongoose')

const Schema = mongoose.Schema

const deliverySchema = new Schema({
    
  vehicle_number: {
    type: String,
    required: true
  },
  vehicle_location: {
    type: String,
    required: true
  },
  delivery_status: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('delivery', deliverySchema)