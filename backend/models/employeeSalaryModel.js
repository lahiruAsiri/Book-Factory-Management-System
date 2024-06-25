const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employeeSalarySchema = new Schema({
    
  employee_name: {
    type: String,
    required: true
  },
  employee_NIC: {
    type: String,
    required: true
  },
  employee_OT: {
    type: Number,
    required: true
  },
  employee_salaryAmount: {
    type: Number,
    required: true
  },
  employee_salary_status: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('employeeSalary', employeeSalarySchema)