const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employeeSchema = new Schema({
    
  employee_name: {
    type: String,
    required: true
  },
  employee_NIC: {
    type: String,
    required: true
  },
  employee_position: {
    type: String,
    required: true
  },
  employee_adresses: {
    type: String,
    required: true
  },
  employee_holidays: {
    type: Number,
    required: true
  },
   phone_number: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('employee', employeeSchema)