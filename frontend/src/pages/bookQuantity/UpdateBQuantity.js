import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './UpdateBQuantity.css'; 
import Home2nav from '../../components/home2nav';


const UpdateBQuantity = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialBookName = queryParams.get("bookName");

  const [bookDetails, setBookDetails] = useState({
    book_name: initialBookName || "",
    book_quantity: ""
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/api/bookquantitys/${initialBookName}`);
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
      await axios.patch(`/api/bookquantitys/${initialBookName}`, bookDetails);
      navigate("/SearchBQUpdate"); 
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
            <Home2nav />
    <div className="update-bquantity-container"> {}
      <h2>Update Book Quantity</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Book Name:
          <input type="text" name="book_name" value={bookDetails.book_name} onChange={handleChange} />
        </label>
        <label>
          Book Quantity:
          <input type="number" name="book_quantity" value={bookDetails.book_quantity} onChange={handleChange} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
    </div>
  );
};

export default UpdateBQuantity;
