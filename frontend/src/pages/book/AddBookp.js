import React, { useState } from "react";
import axios from "axios";
import './AddBook.css'; 

const AddBookp = () => {
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookMarketPrice, setBookMarketPrice] = useState("");
  const [bookMakingPrice, setBookMakingPrice] = useState("");
  const [isbn_number, setIsbnNumber] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (isbn_number.length !== 13) {
        throw new Error("ISBN number must be 13 digits");
      }
      await axios.post("/api/books", {
        book_name: bookName,
        book_author: bookAuthor,
        book_marketPrice: bookMarketPrice,
        book_makingPrice: bookMakingPrice,
        isbn_number: isbn_number
      });
      setSuccess(true);
      setError(null);
      setBookName("");
      setBookAuthor("");
      setBookMarketPrice("");
      setBookMakingPrice("");
      setIsbnNumber("");
    } catch (error) {
      setError(error.message || "Error adding book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Book Name:</label>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Book Author:</label>
          <input
            type="text"
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Market Price:</label>
          <input
            type="number"
            value={bookMarketPrice}
            onChange={(e) => setBookMarketPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Making Price:</label>
          <input
            type="number"
            value={bookMakingPrice}
            onChange={(e) => setBookMakingPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>ISBN Number:</label>
          <input
            type="number"
            value={isbn_number}
            onChange={(e) => setIsbnNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">Book added successfully!</div>}
    </div>
  );
};

export default AddBookp;
