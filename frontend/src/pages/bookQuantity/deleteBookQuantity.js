import React, { useState } from "react";
import axios from "axios";
import './DeleteBookQuantity.css'; 
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';


const DeleteBook = () => {
  const [bookName, setBookName] = useState("");
  const [bookData, setBookData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBookData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/bookquantitys/${encodeURIComponent(bookName)}`);
      if (response.status === 200) {
        setBookData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Book quantity not found");
        setBookData(null);
      } else {
        setError("Book quantity not found");
        setBookData(null);
      }
    } catch (error) {
      setError("Book quantity not found");
      setBookData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchBookData();
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/bookquantitys/${encodeURIComponent(bookName)}`);
      setBookData(null);
      setError("Book quantity deleted successfully");
    } catch (error) {
      setError("Error deleting book quantity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
            <Home2nav />
    <div className="delete-book-container">
      <h2>Delete a Book Quantity</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          placeholder="Enter book name"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
        <Link to="/BookQuantity" className="back-button">Back To Menu</Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      
      {bookData && (
        <div className="book-details">
          <p><strong>Book Name: </strong>{bookData.book_name}</p>
          <p><strong>Book Quantity: </strong>{bookData.book_quantity}</p>
          <button onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete Book Quantity"}
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default DeleteBook;
