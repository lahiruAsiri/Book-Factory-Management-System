const express = require('express')
const {
  getBulkOrders, 
  getBulkOrder, 
  createBulkOrder, 
  deleteBulkOrder, 
  updateBulkOrder
} = require('../controllers/bulkOrdercontroller')

const router = express.Router()

// GET all Books
router.get('/', getBulkOrders)

// GET a single book
router.get('/:custermer_name', getBulkOrder);

// POST a new bookDetails
router.post('/', createBulkOrder)

// DELETE a Book Details
router.delete('/:custermer_name', deleteBulkOrder)

// UPDATE a Book Details
router.patch('/:custermer_name', updateBulkOrder)

module.exports = router