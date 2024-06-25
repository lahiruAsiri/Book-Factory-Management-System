const express = require('express')
const {
  getTransports, 
  getTransport, 
  createTransport, 
  deleteTransport, 
  updateTransport
} = require('../controllers/transportcontroller')

const router = express.Router()

// GET all Books
router.get('/', getTransports)

// GET a single book
router.get('/:vehicle_number', getTransport);

// POST a new bookDetails
router.post('/', createTransport)

// DELETE a Book Details
router.delete('/:vehicle_number', deleteTransport)

// UPDATE a Book Details
router.patch('/:vehicle_number', updateTransport)

module.exports = router