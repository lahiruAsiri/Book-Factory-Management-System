const express = require('express')
const {
  getOrderedMaterials, 
  getOrderedMaterial, 
  createOrderedMaterial, 
  deleteOrderedMaterial, 
  updateOrderedMaterial
} = require('../controllers/orderedMaterialcontroller')

const router = express.Router()

// GET all Books
router.get('/', getOrderedMaterials)

// GET a single book
router.get('/:material_name', getOrderedMaterial);

// POST a new bookDetails
router.post('/', createOrderedMaterial)

// DELETE a Book Details
router.delete('/:material_name', deleteOrderedMaterial)

// UPDATE a Book Details
router.patch('/:material_name', updateOrderedMaterial)

module.exports = router