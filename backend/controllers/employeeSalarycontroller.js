const EmployeeSalary = require('../models/employeeSalaryModel')
const mongoose = require('mongoose')

// get all employee Salary Details
const getEmployeesSalarys = async (req, res) => {
  const employeeSalary = await EmployeeSalary.find({}).sort({createdAt: -1})

  res.status(200).json(employeeSalary)
}

// get a single employee Salary details by NIC
const getEmployeeSalary = async (req, res) => {
    const { employee_NIC } = req.params;
  
    try {
      const employeeSalary = await EmployeeSalary.findOne({ employee_NIC });

      if (!employeeSalary) {
        return res.status(404).json({ error: 'No such employee Salary details' });
      }
  
      res.status(200).json(employeeSalary);
    } catch (error) {
        
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// create a new employee salary Details
const createEmployeeSalary = async (req, res) => {
  const {employee_name, employee_NIC, employee_OT, employee_salaryAmount, employee_salary_status} = req.body

  let emptyFields = []

  if (!employee_name) {
    emptyFields.push('employee_name')
  }
  if (!employee_NIC) {
    emptyFields.push('employee_NIC')
  }
  if (!employee_OT) {
    emptyFields.push('employee_OT')
  }
  if (!employee_salaryAmount) {
    emptyFields.push('employee_salaryAmount')
  }
  if (!employee_salary_status) {
    emptyFields.push('employee_salary_status')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const employeeSalary = await EmployeeSalary.create({employee_name, employee_NIC, employee_OT, employee_salaryAmount, employee_salary_status})
    res.status(200).json(employeeSalary)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a employee salary
const deleteEmployeeSalary = async (req, res) => {
    const { employee_NIC } = req.params;
  
    try {
      const employeeSalary = await EmployeeSalary.findOneAndDelete({ employee_NIC });

      if (!employeeSalary) {
        return res.status(404).json({ error: 'No such a employee Salary details ' });
      }
      res.status(200).json(employeeSalary );
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// update a employee salary
const updateEmployeeSalary = async (req, res) => {
    const { employee_NIC } = req.params;
  
    try {
      const employeeSalary = await EmployeeSalary.findOneAndUpdate({ employee_NIC }, req.body, { new: true });
  
      if (!employeeSalary) {
        return res.status(404).json({ error: 'No such employee Salary details' });
      }
      res.status(200).json(employeeSalary);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

module.exports = {
  getEmployeesSalarys, 
  getEmployeeSalary, 
  createEmployeeSalary, 
  deleteEmployeeSalary, 
  updateEmployeeSalary
}