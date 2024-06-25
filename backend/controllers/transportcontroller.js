const Transport = require('../models/transportModel')
const mongoose = require('mongoose')

// get all transport Details
const getTransports = async (req, res) => {
  const transport = await Transport.find({}).sort({createdAt: -1})

  res.status(200).json(transport)
}

// get a single transport details by number
const getTransport = async (req, res) => {
    const { vehicle_number } = req.params;
  
    try {
      const transport = await Transport.findOne({ vehicle_number });

      if (!transport) {
        return res.status(404).json({ error: 'No such transport details' });
      }
  
      res.status(200).json(transport);
    } catch (error) {
        
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// create a new transport Details
const createTransport = async (req, res) => {
  const {vehicle_number, vehicle_type, vehicle_brandName, vehicle_condition, vehicle_serviceStatus, vehicle_availability, driver_name} = req.body

  let emptyFields = []

  if (!vehicle_number) {
    emptyFields.push('vehicle_number')
  }
  if (!vehicle_type) {
    emptyFields.push('vehicle_type')
  }
  if (!vehicle_brandName) {
    emptyFields.push('vehicle_brandName')
  }
  if (!vehicle_condition) {
    emptyFields.push('vehicle_condition')
  }
  if (!vehicle_serviceStatus) {
    emptyFields.push('vehicle_serviceStatus')
  }
  if (!vehicle_availability) {
    emptyFields.push('vehicle_availability')
  }
  if (!driver_name) {
    emptyFields.push('employee_salary_status')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const transport = await Transport.create({vehicle_number, vehicle_type, vehicle_brandName, vehicle_condition, vehicle_serviceStatus, vehicle_availability, driver_name})
    res.status(200).json(transport)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a transport
const deleteTransport = async (req, res) => {
    const { vehicle_number } = req.params;
  
    try {
      const transport = await Transport.findOneAndDelete({ vehicle_number });

      if (!transport) {
        return res.status(404).json({ error: 'No such a transport details ' });
      }
      res.status(200).json(transport);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// update a transport
const updateTransport = async (req, res) => {
    const { vehicle_number } = req.params;
  
    try {
      const transport = await Transport.findOneAndUpdate({ vehicle_number }, req.body, { new: true });
  
      if (!transport) {
        return res.status(404).json({ error: 'No such transport details' });
      }
      res.status(200).json(transport);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

module.exports = {
    getTransports, 
    getTransport, 
    createTransport, 
    deleteTransport, 
    updateTransport
}