const Book = require('../models/bookModel')
const mongoose = require('mongoose')

// get all Books
const getBooksDetails = async (req, res) => {
  const books = await Book.find({}).sort({createdAt: -1})

  res.status(200).json(books)
}

// get a single book details by name
const getBookDetails = async (req, res) => {
    const { book_name } = req.params;
  
    try {
      const book = await Book.findOne({ book_name });

      if (!book) {
        return res.status(404).json({ error: 'No such book' });
      }
  
      res.status(200).json(book);
    } catch (error) {
        
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


// create a new Book Details
const createBook = async (req, res) => {
  const {book_name, book_author, book_marketPrice, book_makingPrice, isbn_number} = req.body

  let emptyFields = []

  if (!book_name) {
    emptyFields.push('book_name')
  }
  if (!book_author) {
    emptyFields.push('book_author')
  }
  if (!book_marketPrice) {
    emptyFields.push('book_marketPrice')
  }
  if (!book_makingPrice) {
    emptyFields.push('book_makingPrice')
  }
  if (!isbn_number) {
    emptyFields.push('book_makingPrice')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const book = await Book.create({ book_name, book_author, book_marketPrice, book_makingPrice, isbn_number })
    res.status(200).json(book)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a book
const deleteBook = async (req, res) => {
    const { book_name } = req.params;
  
    try {
      const book = await Book.findOneAndDelete({ book_name });

      if (!book) {
        return res.status(404).json({ error: 'No such book' });
      }
      res.status(200).json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// update a book
const updateBook = async (req, res) => {
    const { book_name } = req.params;
  
    try {
      const book = await Book.findOneAndUpdate({ book_name }, req.body, { new: true });
  
      if (!book) {
        return res.status(404).json({ error: 'No such book' });
      }
      res.status(200).json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

module.exports = {
    getBooksDetails, 
    getBookDetails, 
    createBook, 
    deleteBook, 
    updateBook
}