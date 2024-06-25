const express = require('express')
const {
  getPartners, 
  getPartner, 
  createPartner, 
  deletePartner, 
  updatePartner
} = require('../controllers/partnercontroller')

const router = express.Router()

// GET all Books
router.get('/', getPartners)

// GET a single book
router.get('/:partner_shopName', getPartner);

// POST a new bookDetails
router.post('/', createPartner)

// DELETE a Book Details
router.delete('/:partner_shopName', deletePartner)

// UPDATE a Book Details
router.patch('/:partner_shopName', updatePartner)

module.exports = router