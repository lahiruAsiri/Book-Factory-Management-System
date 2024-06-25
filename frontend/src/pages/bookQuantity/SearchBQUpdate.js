import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './SearchBQUpdate.css'; 
import Home2nav from '../../components/home2nav';


const SearchBookForUpdate = () => {
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
        setError("Book not found");
        setBookData(null);
      } else {
        setError("Error fetching book data");
        setBookData(null);
      }
    } catch (error) {
      setError("Error fetching book data");
      setBookData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchBookData();
  };

  return (
    <div>
            <Home2nav />
    <div className="search-book-container">
      <h2>Search For Update</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          placeholder="Enter book name"
        />
        <button type="submit">Search</button>
        <Link to="/BookQuantity" className="back-button">Back To Menu</Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      
      {bookData && (
        <div className="book-details">
          <p><strong>Book Name: </strong>{bookData.book_name}</p>
          <p><strong>Book Quantity: </strong>{bookData.book_quantity}</p>

          {!loading && !error && (
            <Link to={`/bookquantitys/${bookData.book_name}/UpdateBQuantity?bookName=${encodeURIComponent(bookName)}`}>
              <button className="update-button">Update Book</button>
            </Link>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

export default SearchBookForUpdate;
