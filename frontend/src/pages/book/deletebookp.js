import React, { useState } from "react";
import axios from "axios";
import './deletebook.css'; 
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';


const Deletebookp = () => {
  const [bookName, setBookName] = useState("");
  const [bookData, setBookData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBookData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/books/${encodeURIComponent(bookName)}`);
      if (response.status === 200) {
        setBookData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Book not found");
        setBookData(null);
      } else {
        setError("Book not found");
        setBookData(null);
      }
    } catch (error) {
      setError("Book not found");
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
      await axios.delete(`/api/books/${encodeURIComponent(bookName)}`);
      setBookData(null);
      setError("Book deleted successfully");
    } catch (error) {
      setError("Error deleting book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
                  <Home2nav />
    <div className="delete-book-container">
      <h2>Delete a Book</h2>
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
        <Link to="/BookDetails" className="back-button">Back To Menu</Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      
      {bookData && (
        <div className="book-details">
          <p><strong>Book Name: </strong>{bookData.book_name}</p>
          <p><strong>Book Author: </strong>{bookData.book_author}</p>
          <p><strong>Book Market Price: </strong>{bookData.book_marketPrice}</p>
          <p><strong>Book Making Price: </strong>{bookData.book_makingPrice}</p>
          <button onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete Book"}
          </button>
        </div>
      )}
    </div>
    </div>

  );
};

export default Deletebookp;
