const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bulkOrderSchema = new Schema({
    
  custermer_name: {
    type: String,
    required: true
  },
  ordered_quantity: {
    type: Number,
    required: true
  },
  full_payment: {
    type: Number,
    required: true
  },
  done_payment: {
    type: Number,
    required: true
  },
  remaining_payment: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('bulkOrder', bulkOrderSchema)