const express = require('express')
const {
  getMachinesDetails, 
  getMachineDetails, 
  createMachine, 
  deleteMachine, 
  updateMachine
} = require('../controllers/machinecontroller')

const router = express.Router()

// GET all Books
router.get('/', getMachinesDetails)

// GET a single book
router.get('/:machine_name', getMachineDetails);

// POST a new bookDetails
router.post('/', createMachine)

// DELETE a Book Details
router.delete('/:machine_name', deleteMachine)

// UPDATE a Book Details
router.patch('/:machine_name', updateMachine)

module.exports = router