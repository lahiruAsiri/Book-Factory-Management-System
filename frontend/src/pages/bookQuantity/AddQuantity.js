import React, { useState } from "react";
import axios from "axios";
import './AddQuantity.css'; 

const AddBookQuantity = () => {
  const [bookName, setBookName] = useState("");
  const [bookQuantity, setBookQuantity] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Validation
      if (!bookName.trim()) {
        throw new Error("Book name is required");
      }
      if (!bookQuantity.trim() || isNaN(bookQuantity) || parseInt(bookQuantity) < 0) {
        throw new Error("Book quantity must be a non-negative integer");
      }

      await axios.post("/api/bookquantitys", {
        book_name: bookName,
        book_quantity: bookQuantity
      });
      setSuccess(true);
      setError(null);
      setBookName("");
      setBookQuantity("");
    } catch (error) {
      setError(error.message || "Error adding book quantity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-book-quantity-container">
      <h2>Add New Book Quantity</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Book Name:</label>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Book Quantity:</label>
          <input
            type="number"
            value={bookQuantity}
            onChange={(e) => setBookQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Adding..." : "Add Book Quantity"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Book quantity added successfully!</div>}
    </div>
  );
};

export default AddBookQuantity;
