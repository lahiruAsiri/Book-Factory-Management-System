const express = require('express')
const {
  getOrdersDetails, 
  getOrderDetails, 
  createOrder, 
  deleteOrder, 
  updateOrder
} = require('../controllers/ordercontroller')

const router = express.Router()

// GET all Books
router.get('/', getOrdersDetails)

// GET a single book
router.get('/:order_coustermer', getOrderDetails);

// POST a new bookDetails
router.post('/', createOrder)

// DELETE a Book Details
router.delete('/:order_coustermer', deleteOrder)

// UPDATE a Book Details
router.patch('/:order_coustermer', updateOrder)

module.exports = router