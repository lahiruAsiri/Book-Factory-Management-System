const Material = require('../models/materialModel')
const mongoose = require('mongoose')

// get all material Details
const getMaterials = async (req, res) => {
  const material = await Material.find({}).sort({createdAt: -1})

  res.status(200).json(material)
}

// get a single material details by number
const getMaterial = async (req, res) => {
    const { material_name } = req.params;
  
    try {
      const material = await Material.findOne({ material_name });

      if (!material) {
        return res.status(404).json({ error: 'No such material details' });
      }
  
      res.status(200).json(material);
    } catch (error) {
        
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// create a new material Details
const createMaterial = async (req, res) => {
  const {material_name, material_price, material_quantity, material_availability} = req.body

  let emptyFields = []

  if (!material_name) {
    emptyFields.push('material_name')
  }
  if (!material_price) {
    emptyFields.push('material_price')
  }
  if (!material_quantity) {
    emptyFields.push('material_quantity')
  }
  if (!material_availability) {
    emptyFields.push('material_availability')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const material = await Material.create({material_name, material_price, material_quantity, material_availability})
    res.status(200).json(material)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a material
const deleteMaterial = async (req, res) => {
    const { material_name } = req.params;
  
    try {
      const material = await Material.findOneAndDelete({ material_name });

      if (!material) {
        return res.status(404).json({ error: 'No such a material details ' });
      }
      res.status(200).json(material);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// update a material
const updateMaterial = async (req, res) => {
    const { material_name } = req.params;
  
    try {
      const material = await Material.findOneAndUpdate({ material_name }, req.body, { new: true });
  
      if (!material) {
        return res.status(404).json({ error: 'No such material details' });
      }
      res.status(200).json(material);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

module.exports = {
    getMaterials, 
    getMaterial, 
    createMaterial, 
    deleteMaterial, 
    updateMaterial
}