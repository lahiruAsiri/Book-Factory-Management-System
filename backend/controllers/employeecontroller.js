const Employee = require('../models/employeeModel')
const mongoose = require('mongoose')

// get all employee Details
const getEmployeesDetails = async (req, res) => {
  const employee = await Employee.find({}).sort({createdAt: -1})

  res.status(200).json(employee)
}

// get a single employee details by NIC
const getEmployeeDetails = async (req, res) => {
    const { employee_NIC } = req.params;
  
    try {
      const employee = await Employee.findOne({ employee_NIC });

      if (!employee) {
        return res.status(404).json({ error: 'No such employee details' });
      }
  
      res.status(200).json(employee);
    } catch (error) {
        
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// create a new employee Details
const createEmployee = async (req, res) => {
  const {employee_name, employee_NIC, employee_position, employee_adresses, employee_holidays, phone_number} = req.body

  let emptyFields = []

  if (!employee_name) {
    emptyFields.push('employee_name')
  }
  if (!employee_NIC) {
    emptyFields.push('employee_NIC')
  }
  if (!employee_position) {
    emptyFields.push('employee_position')
  }
  if (!employee_adresses) {
    emptyFields.push('employee_adresses')
  }
  if (!employee_holidays) {
    emptyFields.push('employee_holidays')
  }
  if (!phone_number) {
    emptyFields.push('phone_number')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const employee = await Employee.create({employee_name, employee_NIC, employee_position, employee_adresses, employee_holidays, phone_number})
    res.status(200).json(employee)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a employee
const deleteEmployee = async (req, res) => {
    const { employee_NIC } = req.params;
  
    try {
      const employee = await Employee.findOneAndDelete({ employee_NIC });

      if (!employee) {
        return res.status(404).json({ error: 'No such a employee ' });
      }
      res.status(200).json(employee);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// update a employee
const updateemployee = async (req, res) => {
    const { employee_NIC } = req.params;
  
    try {
      const employee = await Employee.findOneAndUpdate({ employee_NIC }, req.body, { new: true });
  
      if (!employee) {
        return res.status(404).json({ error: 'No such employee' });
      }
      res.status(200).json(employee);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

module.exports = {
    getEmployeesDetails, 
    getEmployeeDetails, 
    createEmployee, 
    deleteEmployee, 
    updateemployee
}