const Print = require('../models/PrintingmanageModel')
const mongoose = require('mongoose')

// get all Print Details
const getPrintsDetails = async (req, res) => {
  const print = await Print.find({}).sort({createdAt: -1})

  res.status(200).json(print)
}

// get a single Print details by name
const getPrintDetails = async (req, res) => {
    const { printing_bookName } = req.params;
  
    try {
      const print = await Print.findOne({ printing_bookName });

      if (!print) {
        return res.status(404).json({ error: 'No such Print details' });
      }
  
      res.status(200).json(print);
    } catch (error) {
        
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// create a new print Details
const createPrint = async (req, res) => {
  const {printing_bookName, printing_quantity, need_material, printing_status } = req.body

  let emptyFields = []

  if (!printing_bookName) {
    emptyFields.push('printing_bookName')
  }
  if (!printing_quantity) {
    emptyFields.push('printing_quantity')
  }
  if (!need_material) {
    emptyFields.push('need_material')
  }
  if (!printing_status) {
    emptyFields.push('printing_status')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const print = await Print.create({printing_bookName, printing_quantity, need_material, printing_status})
    res.status(200).json(print)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a Print
const deletePrint = async (req, res) => {
    const { printing_bookName } = req.params;
  
    try {
      const print = await Print.findOneAndDelete({ printing_bookName });

      if (!print) {
        return res.status(404).json({ error: 'No such a print ' });
      }
      res.status(200).json(print);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// update a print
const updatePrint = async (req, res) => {
    const { printing_bookName } = req.params;
  
    try {
      const print = await Print.findOneAndUpdate({ printing_bookName }, req.body, { new: true });
  
      if (!print) {
        return res.status(404).json({ error: 'No such print' });
      }
      res.status(200).json(print);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

module.exports = {
    getPrintsDetails, 
    getPrintDetails, 
    createPrint, 
    deletePrint, 
    updatePrint
}