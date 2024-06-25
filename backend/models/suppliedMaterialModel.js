const mongoose = require('mongoose')

const Schema = mongoose.Schema

const suppliedMaterialSchema = new Schema({
  
  material_name: {
    type: String,
    required: true
  },
  receivered_section: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  date: {
    type: String ,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('suppliedMaterial', suppliedMaterialSchema)