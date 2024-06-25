const Borders = require('../models/bulkOrderModel')
const mongoose = require('mongoose')

// get all bulk order Details
const getBulkOrders = async (req, res) => {
  const borders = await Borders.find({}).sort({createdAt: -1})

  res.status(200).json(borders)
}

// get a single bulk order details by custermer name
const getBulkOrder = async (req, res) => {
    const { custermer_name } = req.params;
  
    try {
      const borders = await Borders.findOne({ custermer_name });

      if (!borders) {
        return res.status(404).json({ error: 'No such bulk order details' });
      }
  
      res.status(200).json(borders);
    } catch (error) {
        
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// create a new bulk order Details
const createBulkOrder = async (req, res) => {
  const {custermer_name, ordered_quantity, full_payment, done_payment, remaining_payment} = req.body

  let emptyFields = []

  if (!custermer_name) {
    emptyFields.push('custermer_name')
  }
  if (!ordered_quantity) {
    emptyFields.push('ordered_quantity')
  }
  if (!full_payment) {
    emptyFields.push('full_payment')
  }
  if (!done_payment) {
    emptyFields.push('done_payment')
  }
  if (!remaining_payment) {
    emptyFields.push('remaining_payment')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const borders = await Borders.create({custermer_name, ordered_quantity, full_payment, done_payment, remaining_payment})
    res.status(200).json(borders)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a bulk orders 
const deleteBulkOrder = async (req, res) => {
    const { custermer_name } = req.params;
  
    try {
      const borders = await Borders.findOneAndDelete({ custermer_name });

      if (!borders) {
        return res.status(404).json({ error: 'No such a bulk order details ' });
      }
      res.status(200).json(borders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// update a bulk order
const updateBulkOrder = async (req, res) => {
    const { custermer_name } = req.params;
  
    try {
      const borders = await Borders.findOneAndUpdate({ custermer_name }, req.body, { new: true });
  
      if (!borders) {
        return res.status(404).json({ error: 'No such bulk order details' });
      }
      res.status(200).json(borders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

module.exports = {
    getBulkOrders, 
  getBulkOrder, 
  createBulkOrder, 
  deleteBulkOrder, 
  updateBulkOrder
}