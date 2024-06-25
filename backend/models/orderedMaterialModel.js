const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderdMaterialSchema = new Schema({
    
  material_name: {
    type: String,
    required: true
  },
  orderd_quantity: {
    type: String,
    required: true
  },
  supplier_name: {
    type: String,
    required: true
  },
  ordred_cost: {
    type: Number,
    required: true
  },
  ordred_status: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('orderdMaterial', orderdMaterialSchema)