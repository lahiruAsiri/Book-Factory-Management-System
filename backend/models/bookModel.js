const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookSchema = new Schema({
  book_name: {
    type: String,
    required: true
  },
  book_author: {
    type: String,
    required: true
  },
  book_marketPrice: {
    type: Number,
    required: true
  },
  book_makingPrice: {
    type: Number,
    required: true
  },
  isbn_number: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('book', bookSchema)