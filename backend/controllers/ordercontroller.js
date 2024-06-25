const Order = require('../models/orderModel')
const mongoose = require('mongoose')

// get all Orders
const getOrdersDetails = async (req, res) => {
  const order = await Order.find({}).sort({createdAt: -1})

  res.status(200).json(order)
}

// get a single Order details by name
const getOrderDetails = async (req, res) => {
    const { order_coustermer } = req.params;
  
    try {
      const order = await Order.findOne({ order_coustermer });

      if (!order) {
        return res.status(404).json({ error: 'No such Order' });
      }
  
      res.status(200).json(order);
    } catch (error) {
        
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// create a new Order Details
const createOrder = async (req, res) => {
  const {order_coustermer, ordered_books, order_quantity, order_adresses, ordered_date, delivery_status } = req.body

  let emptyFields = []

  if (!order_coustermer) {
    emptyFields.push('order_coustermer')
  }
  if (!ordered_books) {
    emptyFields.push('ordered_books')
  }
  if (!order_quantity) {
    emptyFields.push('order_quantity')
  }
  if (!order_adresses) {
    emptyFields.push('order_adresses')
  }
  if (!ordered_date) {
    emptyFields.push('ordered_date')
  }
  if (!delivery_status) {
    emptyFields.push('delivery_status')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const order = await Order.create({ order_coustermer, ordered_books, order_quantity, order_adresses, ordered_date, delivery_status })
    res.status(200).json(order)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a order
const deleteOrder = async (req, res) => {
    const { order_coustermer } = req.params;
  
    try {
      const order = await Order.findOneAndDelete({ order_coustermer });

      if (!order) {
        return res.status(404).json({ error: 'No such a order ' });
      }
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// update a order
const updateOrder = async (req, res) => {
    const { order_coustermer } = req.params;
  
    try {
      const order = await Order.findOneAndUpdate({ order_coustermer }, req.body, { new: true });
  
      if (!order) {
        return res.status(404).json({ error: 'No such order' });
      }
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

module.exports = {
    getOrdersDetails, 
    getOrderDetails, 
    createOrder, 
    deleteOrder, 
    updateOrder
}