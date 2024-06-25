import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './UpdatePrinting.css'; 
import Home2nav from '../../components/home2nav';


const UpdatePrinting = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialPrintingBookName = queryParams.get("printingBookName");

  const [printingDetails, setPrintingDetails] = useState({
    printing_bookName: initialPrintingBookName || "",
    printing_quantity: "",
    need_material: "",
    printing_status: ""
  });

  useEffect(() => {
    const fetchPrintingDetails = async () => {
      try {
        const response = await axios.get(`/api/printingmanages/${initialPrintingBookName}`);
        setPrintingDetails(response.data);
      } catch (error) {
        console.error("Error fetching printing details:", error);
      }
    };

    fetchPrintingDetails();
  }, [initialPrintingBookName]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPrintingDetails({ ...printingDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`/api/printingmanages/${initialPrintingBookName}`, printingDetails);
      navigate("/SerachPrintingU"); 
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
    <Home2nav />
    <div className="update-printing-container">
      <h2>Update Printing Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Book Name:
          <input type="text" name="printing_bookName" value={printingDetails.printing_bookName} onChange={handleChange} />
        </label>
        <label>
          Printing Quantity:
          <input type="number" name="printing_quantity" value={printingDetails.printing_quantity} onChange={handleChange} />
        </label>
        <label>
          Need Material:
          <input type="text" name="need_material" value={printingDetails.need_material} onChange={handleChange} />
        </label>
        <label>
          Printing Status:
         <select name="printing_status" value={printingDetails.printing_status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          </label>

        <button type="submit">Update</button>
      </form>
    </div>
    </div>

  );
};

export default UpdatePrinting;
