const Machine = require('../models/machineModel')
const mongoose = require('mongoose')

// get all machine Details
const getMachinesDetails = async (req, res) => {
  const machine = await Machine.find({}).sort({createdAt: -1})

  res.status(200).json(machine)
}

// get a single machine details by name
const getMachineDetails = async (req, res) => {
    const { machine_name } = req.params;
  
    try {
      const machine = await Machine.findOne({ machine_name });

      if (!machine) {
        return res.status(404).json({ error: 'No such machine details' });
      }
  
      res.status(200).json(machine);
    } catch (error) {
        
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// create a new machine Details
const createMachine = async (req, res) => {
  const {machine_number, machine_name, machine_condition, machine_availableStatus } = req.body

  let emptyFields = []

  if (!machine_number) {
    emptyFields.push('machine_number')
  }
  if (!machine_name) {
    emptyFields.push('machine_name')
  }
  if (!machine_condition) {
    emptyFields.push('machine_condition')
  }
  if (!machine_availableStatus) {
    emptyFields.push('machine_availableStatus')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const machine = await Machine.create({machine_number, machine_name, machine_condition, machine_availableStatus })
    res.status(200).json(machine)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a machine
const deleteMachine = async (req, res) => {
    const { machine_name } = req.params;
  
    try {
      const machine = await Machine.findOneAndDelete({ machine_name });

      if (!machine) {
        return res.status(404).json({ error: 'No such a machine ' });
      }
      res.status(200).json(machine);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// update a print
const updateMachine = async (req, res) => {
    const { machine_name } = req.params;
  
    try {
      const machine = await Machine.findOneAndUpdate({ machine_name }, req.body, { new: true });
  
      if (!machine) {
        return res.status(404).json({ error: 'No such machine' });
      }
      res.status(200).json(machine);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

module.exports = {
    getMachinesDetails, 
    getMachineDetails, 
    createMachine, 
    deleteMachine, 
    updateMachine
}