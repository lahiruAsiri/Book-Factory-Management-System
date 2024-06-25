const mongoose = require('mongoose')

const Schema = mongoose.Schema

const materialSchema = new Schema({
    
  material_name: {
    type: String,
    required: true
  },
  material_price: {
    type: String,
    required: true
  },
  material_quantity: {
    type: String,
    required: true
  },
  material_availability: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('material', materialSchema)