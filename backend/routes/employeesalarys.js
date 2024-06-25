const express = require('express')
const {
  getEmployeesSalarys, 
  getEmployeeSalary, 
  createEmployeeSalary, 
  deleteEmployeeSalary, 
  updateEmployeeSalary
} = require('../controllers/employeeSalarycontroller')

const router = express.Router()

// GET all Books
router.get('/', getEmployeesSalarys)

// GET a single book
router.get('/:employee_NIC', getEmployeeSalary);

// POST a new bookDetails
router.post('/', createEmployeeSalary)

// DELETE a Book Details
router.delete('/:employee_NIC', deleteEmployeeSalary)

// UPDATE a Book Details
router.patch('/:employee_NIC', updateEmployeeSalary)

module.exports = router