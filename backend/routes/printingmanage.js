const express = require('express')
const {
  getPrintsDetails, 
  getPrintDetails, 
  createPrint, 
  deletePrint, 
  updatePrint
} = require('../controllers/printcontroller')

const router = express.Router()

// GET all Books
router.get('/', getPrintsDetails)

// GET a single book
router.get('/:printing_bookName', getPrintDetails);

// POST a new bookDetails
router.post('/', createPrint)

// DELETE a Book Details
router.delete('/:printing_bookName', deletePrint)

// UPDATE a Book Details
router.patch('/:printing_bookName', updatePrint)

module.exports = router