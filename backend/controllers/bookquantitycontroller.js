const Bookquantity = require('../models/bookquantityModel')
const mongoose = require('mongoose')

// get all Books quantity
const getBooksQuantity = async (req, res) => {
  const bookquantity = await Bookquantity.find({}).sort({createdAt: -1})

  res.status(200).json(bookquantity)
}

// get a single book  quantity details by name
const getBookQuantity = async (req, res) => {
    const { book_name } = req.params;
  
    try {
      const bookquantity = await Bookquantity.findOne({ book_name });

      if (!bookquantity) {
        return res.status(404).json({ error: 'No such book quantity' });
      }
  
      res.status(200).json(bookquantity);
    } catch (error) {
        
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// create a new Book quantity Details
const createBookQuantity = async (req, res) => {
  const {book_name, book_quantity } = req.body

  let emptyFields = []

  if (!book_name) {
    emptyFields.push('book_name')
  }
  if (!book_quantity) {
    emptyFields.push('book_quantity')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const bookquantity = await Bookquantity.create({ book_name, book_quantity })
    res.status(200).json(bookquantity)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a book quantity
const deleteBookQuantity = async (req, res) => {
    const { book_name } = req.params;
  
    try {
      const bookquantity = await Bookquantity.findOneAndDelete({ book_name });

      if (!bookquantity) {
        return res.status(404).json({ error: 'No such book Quantity' });
      }
      res.status(200).json(bookquantity);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// update a book quantity
const updateBookQuantity = async (req, res) => {
    const { book_name } = req.params;
  
    try {
      const bookquantity = await Bookquantity.findOneAndUpdate({ book_name }, req.body, { new: true });
  
      if (!bookquantity) {
        return res.status(404).json({ error: 'No such book quantity' });
      }
      res.status(200).json(bookquantity);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

module.exports = {
    getBooksQuantity, 
    getBookQuantity, 
    createBookQuantity, 
    deleteBookQuantity, 
    updateBookQuantity
}