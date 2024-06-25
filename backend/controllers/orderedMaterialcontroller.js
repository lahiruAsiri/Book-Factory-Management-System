const Omaterial = require('../models/orderedMaterialModel')
const mongoose = require('mongoose')

// get all orderd material Details
const getOrderedMaterials = async (req, res) => {
  const omaterial = await Omaterial.find({}).sort({createdAt: -1})

  res.status(200).json(omaterial)
}

// get a single ordered material details by number
const getOrderedMaterial = async (req, res) => {
    const { material_name } = req.params;
  
    try {
      const omaterial = await Omaterial.findOne({ material_name });

      if (!omaterial) {
        return res.status(404).json({ error: 'No such ordered material details' });
      }
  
      res.status(200).json(omaterial);
    } catch (error) {
        
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// create a new ordered material Details
const createOrderedMaterial = async (req, res) => {
  const {material_name, orderd_quantity, supplier_name, ordred_cost, ordred_status} = req.body

  let emptyFields = []

  if (!material_name) {
    emptyFields.push('material_name')
  }
  if (!orderd_quantity) {
    emptyFields.push('orderd_quantity')
  }
  if (!supplier_name) {
    emptyFields.push('supplier_name')
  }
  if (!ordred_cost) {
    emptyFields.push('ordred_cost')
  }
  if (!ordred_status) {
    emptyFields.push('ordred_status')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const omaterial = await Omaterial.create({material_name, orderd_quantity, supplier_name, ordred_cost, ordred_status})
    res.status(200).json(omaterial)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a ordered material
const deleteOrderedMaterial = async (req, res) => {
    const { material_name } = req.params;
  
    try {
      const omaterial = await Omaterial.findOneAndDelete({ material_name });

      if (!omaterial) {
        return res.status(404).json({ error: 'No such a Ordered material details ' });
      }
      res.status(200).json(omaterial);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// update a ordered material
const updateOrderedMaterial = async (req, res) => {
    const { material_name } = req.params;
  
    try {
      const omaterial = await Omaterial.findOneAndUpdate({ material_name }, req.body, { new: true });
  
      if (!omaterial) {
        return res.status(404).json({ error: 'No such ordered material details' });
      }
      res.status(200).json(omaterial);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

module.exports = {
    getOrderedMaterials, 
    getOrderedMaterial, 
    createOrderedMaterial, 
    deleteOrderedMaterial, 
    updateOrderedMaterial
}