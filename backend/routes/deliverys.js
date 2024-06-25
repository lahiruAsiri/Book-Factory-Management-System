const express = require('express')
const {
  getDeliverys, 
  getDelivery, 
  createDelivery, 
  deleteDelivery, 
  updateDelivery
} = require('../controllers/Deliverycontroller')

const router = express.Router()

// GET all Books
router.get('/', getDeliverys)

// GET a single book
router.get('/:vehicle_number', getDelivery);

// POST a new bookDetails
router.post('/', createDelivery)

// DELETE a Book Details
router.delete('/:vehicle_number', deleteDelivery)

// UPDATE a Book Details
router.patch('/:vehicle_number', updateDelivery)

module.exports = router