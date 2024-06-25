const Partner = require('../models/partnerModel')
const mongoose = require('mongoose')

// get all partner Details
const getPartners = async (req, res) => {
  const partner = await Partner.find({}).sort({createdAt: -1})

  res.status(200).json(partner)
}

// get a single partner details by shop name
const getPartner = async (req, res) => {
    const { partner_shopName } = req.params;
  
    try {
      const partner = await Partner.findOne({ partner_shopName });

      if (!partner) {
        return res.status(404).json({ error: 'No such a partner details' });
      }
  
      res.status(200).json(partner);
    } catch (error) {
        
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// create a new partner Details
const createPartner = async (req, res) => {
  const {partner_name, partner_shopName, shop_adresses, payment_status} = req.body

  let emptyFields = []

  if (!partner_name) {
    emptyFields.push('partner_name')
  }
  if (!partner_shopName) {
    emptyFields.push('partner_shopName')
  }
  if (!shop_adresses) {
    emptyFields.push('shop_adresses')
  }
  if (!payment_status) {
    emptyFields.push('payment_status')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const partner = await Partner.create({partner_name, partner_shopName, shop_adresses, payment_status})
    res.status(200).json(partner)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a partner
const deletePartner = async (req, res) => {
    const { partner_shopName } = req.params;
  
    try {
      const partner = await Partner.findOneAndDelete({ partner_shopName });

      if (!partner) {
        return res.status(404).json({ error: 'No such a partner details ' });
      }
      res.status(200).json(partner);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// update a partner
const updatePartner = async (req, res) => {
    const { partner_shopName } = req.params;
  
    try {
      const partner = await Partner.findOneAndUpdate({ partner_shopName }, req.body, { new: true });
  
      if (!partner) {
        return res.status(404).json({ error: 'No such partner details' });
      }
      res.status(200).json(partner);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

module.exports = {
    getPartners, 
    getPartner, 
    createPartner, 
    deletePartner, 
    updatePartner
}