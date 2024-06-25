import React, { useState } from "react";
import axios from "axios";
import "./GetOneBook.css"; 

const GetOneBook = () => {
  const [bookName, setBookName] = useState("");
  const [bookData, setBookData] = useState(null);
  const [error, setError] = useState(null);

  const fetchBookData = async () => {
    try {
      const response = await axios.get(`/api/books/${encodeURIComponent(bookName)}`);
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
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    await fetchBookData();
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

      {bookData && (
        <div className="book-details">
          <h2>Search Result:</h2>
          <div>
            <p><strong>Book Name: </strong>{bookData.book_name}</p>
            <p><strong>Book Author: </strong>{bookData.book_author}</p>
            <p><strong>Book Market Price: </strong>{bookData.book_marketPrice}</p>
            <p><strong>Book Making Price: </strong>{bookData.book_makingPrice}</p>
            <p><strong>ISBN: </strong>{bookData.isbn_number}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetOneBook;
