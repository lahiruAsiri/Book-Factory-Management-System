const express = require('express')
const {
  getBooksQuantity, 
  getBookQuantity, 
  createBookQuantity, 
  deleteBookQuantity, 
  updateBookQuantity
} = require('../controllers/bookquantitycontroller')

const router = express.Router()

// GET all Books quantity
router.get('/', getBooksQuantity)

// GET a single book quantity
router.get('/:book_name', getBookQuantity);

// POST a new book quantity
router.post('/', createBookQuantity)

// DELETE a Book quantity
router.delete('/:book_name', deleteBookQuantity)

// UPDATE a Book quantity
router.patch('/:book_name', updateBookQuantity)

module.exports = router