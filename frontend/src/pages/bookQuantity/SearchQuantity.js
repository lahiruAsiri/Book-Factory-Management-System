import React, { useState } from "react";
import axios from "axios";
import "./SerachQunatity.css";

const GetQuantity = () => {
  const [bookName, setBookName] = useState("");
  const [bookQuantity, setBookQuantity] = useState(null);
  const [error, setError] = useState(null);

  const fetchBookQuantity = async () => {
    try {
      const response = await axios.get(`/api/bookquantitys/${encodeURIComponent(bookName)}`);
      if (response.status === 200) {
        setBookQuantity(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Book quantity not found");
        setBookQuantity(null);
      } else {
        setError("Error fetching book quantity data");
        setBookQuantity(null);
      }
    } catch (error) {
      setError("Error fetching book quantity data");
      setBookQuantity(null);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    await fetchBookQuantity();
  };

  return (
    <div className="get-one-book-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          placeholder="Enter book name"
        />
        <button type="submit">Search</button>
      </form>

      {error && <div className="error">{error}</div>}

      {bookQuantity && (
        <div className="book-details">
          <h2>Search Result:</h2>
          <div>
            <p><strong>Book Name: </strong>{bookQuantity.book_name}</p>
            <p><strong>Book Quantity: </strong>{bookQuantity.book_quantity}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetQuantity;
