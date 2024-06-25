const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookQuantitySchema = new Schema({
  book_name: {
    type: String,
    required: true
  },
  book_quantity: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('bookQuantity', bookQuantitySchema)