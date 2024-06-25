import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './UpdateBookPage.css'; 
import Home2nav from '../../components/home2nav';


const UpdateBookPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialBookName = queryParams.get("bookName");

  const [bookDetails, setBookDetails] = useState({
    book_name: initialBookName || "",
    book_author: "",
    book_marketPrice: "",
    book_makingPrice: "",
    isbn_number: "" // Add ISBN field here
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/api/books/${initialBookName}`);
        setBookDetails(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [initialBookName]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`/api/books/${initialBookName}`, bookDetails);
      navigate("/SearchBookForUpdate"); 
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <Home2nav />
      <div className="update-book-container">
        <h2>Update Book</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Book Name:
            <input type="text" name="book_name" value={bookDetails.book_name} onChange={handleChange} />
          </label>
          <label>
            Book Author:
            <input type="text" name="book_author" value={bookDetails.book_author} onChange={handleChange} />
          </label>
          <label>
            Book Market Price:
            <input type="number" name="book_marketPrice" value={bookDetails.book_marketPrice} onChange={handleChange} />
          </label>
          <label>
            Book Making Price:
            <input type="number" name="book_makingPrice" value={bookDetails.book_makingPrice} onChange={handleChange} />
          </label>
          <label>
            ISBN Number:
            <input type="text" name="isbn_number" value={bookDetails.isbn_number} onChange={handleChange} />
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookPage;
