const express = require('express')
const {
  getEmployeesDetails, 
  getEmployeeDetails, 
  createEmployee, 
  deleteEmployee, 
  updateemployee
} = require('../controllers/employeecontroller')

const router = express.Router()

// GET all Books
router.get('/', getEmployeesDetails)

// GET a single book
router.get('/:employee_NIC', getEmployeeDetails);

// POST a new bookDetails
router.post('/', createEmployee)

// DELETE a Book Details
router.delete('/:employee_NIC', deleteEmployee)

// UPDATE a Book Details
router.patch('/:employee_NIC', updateemployee)

module.exports = router