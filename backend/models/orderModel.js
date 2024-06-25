const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
  order_coustermer: {
    type: String,
    required: true
  },
  ordered_books: {
    type: String,
    required: true
  },
  order_quantity: {
    type: Number,
    required: true
  },
  order_adresses: {
    type: String,
    required: true
  },
  ordered_date: {
    type: String,
    required: true
  },
  delivery_status: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('order', orderSchema)