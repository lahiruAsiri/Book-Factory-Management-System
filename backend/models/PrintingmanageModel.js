const mongoose = require('mongoose')

const Schema = mongoose.Schema

const printingSchema = new Schema({
  
  printing_bookName: {
    type: String,
    required: true
  },
  printing_quantity: {
    type: Number,
    required: true
  },
  need_material: {
    type: String,
    required: true
  },
  printing_status: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('printing', printingSchema)