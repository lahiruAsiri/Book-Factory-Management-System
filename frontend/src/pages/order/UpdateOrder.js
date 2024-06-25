import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './UpdateOrder.css'; 
import Home2nav from '../../components/home2nav';


const UpdateOrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialOrderCustomer = queryParams.get("orderCustomer");

  const [orderDetails, setOrderDetails] = useState({
    order_coustermer: initialOrderCustomer || "",
    ordered_books: "",
    order_quantity: "",
    order_adresses: "",
    ordered_date: "",
    delivery_status: ""
  });

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/api/orders/${initialOrderCustomer}`);
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [initialOrderCustomer]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`/api/orders/${initialOrderCustomer}`, orderDetails);
      navigate("/SerachOrderUpdate"); 
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
    <Home2nav />
    <div className="update-order-container">
      <h2>Update Order</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Order Customer:
          <input type="text" name="order_coustermer" value={orderDetails.order_coustermer} onChange={handleChange} />
        </label>
        <label>
          Ordered Books:
          <input type="text" name="ordered_books" value={orderDetails.ordered_books} onChange={handleChange} />
        </label>
        <label>
          Order Quantity:
          <input type="number" name="order_quantity" value={orderDetails.order_quantity} onChange={handleChange} />
        </label>
        <label>
          Order Address:
          <input type="text" name="order_adresses" value={orderDetails.order_adresses} onChange={handleChange} />
        </label>
        <label>
          Ordered Date:
          <input type="text" name="ordered_date" value={orderDetails.ordered_date} onChange={handleChange} />
        </label>
        <label>
           Delivery Status:
       <select
          name="delivery_status"
          value={orderDetails.delivery_status}
           onChange={handleChange}
           >
           <option value="Delivered">Delivered</option>
         <option value="Not Delivered">Not Delivered</option>
        </select>
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
    </div>

  );
};

export default UpdateOrderPage;
