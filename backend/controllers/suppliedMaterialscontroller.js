const Smaterial = require('../models/suppliedMaterialModel')
const mongoose = require('mongoose')

// get all supplied material Details
const getSuppliedMaterials = async (req, res) => {
  const smaterial = await Smaterial.find({}).sort({createdAt: -1})

  res.status(200).json(smaterial)
}

// get a single supplied material details by number
const getSuppliedMaterial = async (req, res) => {
    const { material_name } = req.params;
  
    try {
      const smaterial = await Smaterial.findOne({ material_name });

      if (!smaterial) {
        return res.status(404).json({ error: 'No such supplied material details' });
      }
  
      res.status(200).json(smaterial);
    } catch (error) {
        
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// create a new supplied material Details
const createSuppliedMaterial = async (req, res) => {
  const {material_name, receivered_section, quantity, date} = req.body

  let emptyFields = []

  if (!material_name) {
    emptyFields.push('material_name')
  }
  if (!receivered_section) {
    emptyFields.push('receivered_section')
  }
  if (!quantity) {
    emptyFields.push('quantity')
  }
  if (!date) {
    emptyFields.push('date')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const smaterial = await Smaterial.create({material_name, receivered_section, quantity, date})
    res.status(200).json(smaterial)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a supplied material
const deleteSuppliedMaterial = async (req, res) => {
    const { material_name } = req.params;
  
    try {
      const smaterial = await Smaterial.findOneAndDelete({ material_name });

      if (!smaterial) {
        return res.status(404).json({ error: 'No such a supplied material details ' });
      }
      res.status(200).json(smaterial);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// update a supplied material
const updateSuppliedMaterial = async (req, res) => {
    const { material_name } = req.params;
  
    try {
      const smaterial = await Smaterial.findOneAndUpdate({ material_name }, req.body, { new: true });
  
      if (!smaterial) {
        return res.status(404).json({ error: 'No such supplied material details' });
      }
      res.status(200).json(smaterial);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

module.exports = {
    getSuppliedMaterials, 
    getSuppliedMaterial, 
    createSuppliedMaterial, 
    deleteSuppliedMaterial, 
    updateSuppliedMaterial
}