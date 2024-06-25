const express = require('express')
const {
  getMaterials, 
  getMaterial, 
  createMaterial, 
  deleteMaterial, 
  updateMaterial
} = require('../controllers/materialcontroller')

const router = express.Router()

// GET all Books
router.get('/', getMaterials)

// GET a single book
router.get('/:material_name', getMaterial);

// POST a new bookDetails
router.post('/', createMaterial)

// DELETE a Book Details
router.delete('/:material_name', deleteMaterial)

// UPDATE a Book Details
router.patch('/:material_name', updateMaterial)

module.exports = router