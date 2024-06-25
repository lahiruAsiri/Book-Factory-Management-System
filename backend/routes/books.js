const express = require('express')
const {
  getBooksDetails, 
  getBookDetails, 
  getBookDetailsById,
  createBook, 
  deleteBook, 
  updateBook
} = require('../controllers/bookcontroller')

const router = express.Router()

// GET all Books
router.get('/', getBooksDetails)

// GET a single book
router.get('/:book_name', getBookDetails);

// POST a new bookDetails
router.post('/', createBook)

// DELETE a Book Details
router.delete('/:book_name', deleteBook)

// UPDATE a Book Details
router.patch('/:book_name', updateBook)

module.exports = router