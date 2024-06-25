const express = require('express')
const {
  getSuppliedMaterials, 
  getSuppliedMaterial, 
  createSuppliedMaterial, 
  deleteSuppliedMaterial, 
  updateSuppliedMaterial
} = require('../controllers/suppliedMaterialscontroller')

const router = express.Router()

// GET all Books
router.get('/', getSuppliedMaterials)

// GET a single book
router.get('/:material_name', getSuppliedMaterial);

// POST a new bookDetails
router.post('/', createSuppliedMaterial)

// DELETE a Book Details
router.delete('/:material_name', deleteSuppliedMaterial)

// UPDATE a Book Details
router.patch('/:material_name', updateSuppliedMaterial)

module.exports = router