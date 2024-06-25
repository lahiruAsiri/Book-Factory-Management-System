const Delivery = require('../models/deliveryModel')
const mongoose = require('mongoose')

// get all deleivery Details
const getDeliverys = async (req, res) => {
  const delivery = await Delivery.find({}).sort({createdAt: -1})

  res.status(200).json(delivery)
}

// get a single deleivery details by number
const getDelivery = async (req, res) => {
    const { vehicle_number } = req.params;
  
    try {
      const deleivery = await Delivery.findOne({ vehicle_number });

      if (!deleivery) {
        return res.status(404).json({ error: 'No such delivery details' });
      }
  
      res.status(200).json(deleivery);
    } catch (error) {
        
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// create a new delivery Details
const createDelivery = async (req, res) => {
  const {vehicle_number, vehicle_location, delivery_status} = req.body

  let emptyFields = []

  if (!vehicle_number) {
    emptyFields.push('vehicle_number')
  }
  if (!vehicle_location) {
    emptyFields.push('vehicle_location')
  }
  if (!delivery_status) {
    emptyFields.push('delivery_status')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const deleivery = await Delivery.create({vehicle_number, vehicle_location, delivery_status})
    res.status(200).json(deleivery)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a delivery
const deleteDelivery = async (req, res) => {
    const { vehicle_number } = req.params;
  
    try {
      const deleivery = await Delivery.findOneAndDelete({ vehicle_number });

      if (!deleivery) {
        return res.status(404).json({ error: 'No such a delivery details ' });
      }
      res.status(200).json(deleivery);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// update a transport
const updateDelivery = async (req, res) => {
    const { vehicle_number } = req.params;
  
    try {
      const deleivery = await Delivery.findOneAndUpdate({ vehicle_number }, req.body, { new: true });
  
      if (!deleivery) {
        return res.status(404).json({ error: 'No such delivery details' });
      }
      res.status(200).json(deleivery);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

module.exports = {
    getDeliverys, 
    getDelivery, 
    createDelivery, 
    deleteDelivery, 
    updateDelivery
}