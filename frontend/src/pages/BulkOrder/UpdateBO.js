import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './UpdateBO.css'; 
import Home2nav from '../../components/home2nav';


const UpdateBulkOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialCustomerName = queryParams.get("customerName");

  const [bulkOrderDetails, setBulkOrderDetails] = useState({
    customer_name: initialCustomerName || "",
    ordered_quantity: 0,
    full_payment: 0,
    done_payment: 0,
    remaining_payment: 0
  });

  useEffect(() => {
    const fetchBulkOrderDetails = async () => {
      try {
        const response = await axios.get(`/api/bulkOrders/${initialCustomerName}`);
        setBulkOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching bulk order details:", error);
      }
    };

    fetchBulkOrderDetails();
  }, [initialCustomerName]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBulkOrderDetails({ ...bulkOrderDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`/api/bulkOrders/${initialCustomerName}`, bulkOrderDetails);
      navigate("/SearchBOU"); 
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
    <Home2nav />
    <div className="update-bulk-order-container">
      <h2>Update Bulk Order Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Customer Name:
          <input type="text" name="customer_name" value={bulkOrderDetails.customer_name} onChange={handleChange} />
        </label>
        <label>
          Ordered Quantity:
          <input type="number" name="ordered_quantity" value={bulkOrderDetails.ordered_quantity} onChange={handleChange} />
        </label>
        <label>
          Full Payment:
          <input type="number" name="full_payment" value={bulkOrderDetails.full_payment} onChange={handleChange} />
        </label>
        <label>
          Done Payment:
          <input type="number" name="done_payment" value={bulkOrderDetails.done_payment} onChange={handleChange} />
        </label>
        <label>
          Remaining Payment:
          <input type="number" name="remaining_payment" value={bulkOrderDetails.remaining_payment} onChange={handleChange} />
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
    </div>

  );
};

export default UpdateBulkOrder;
