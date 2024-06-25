import React, { useState } from "react";
import axios from "axios";
import './DeleteOrder.css'; 
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';


const DeleteOrder = () => {
  const [orderCustomer, setOrderCustomer] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOrderData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/orders/${encodeURIComponent(orderCustomer)}`);
      if (response.status === 200) {
        setOrderData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Order not found");
        setOrderData(null);
      } else {
        setError("Order not found");
        setOrderData(null);
      }
    } catch (error) {
      setError("Order not found");
      setOrderData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchOrderData();
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/orders/${encodeURIComponent(orderCustomer)}`);
      setOrderData(null);
      setError("Order deleted successfully");
    } catch (error) {
      setError("Error deleting order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <Home2nav />
    <div className="delete-order-container">
      <h2>Delete an Order</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={orderCustomer}
          onChange={(e) => setOrderCustomer(e.target.value)}
          placeholder="Enter customer name"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
        <Link to="/OrderManage" className="back-button">Back To Menu</Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      
      {orderData && (
        <div className="order-details">
          <p><strong>Customer Name: </strong>{orderData.order_coustermer}</p>
          <p><strong>Ordered Books: </strong>{orderData.ordered_books}</p>
          <p><strong>Order Quantity: </strong>{orderData.order_quantity}</p>
          <p><strong>Order Address: </strong>{orderData.order_address}</p>
          <p><strong>Ordered Date: </strong>{orderData.ordered_date}</p>
          <p><strong>Delivery Status: </strong>{orderData.delivery_status}</p>
          <button onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete Order"}
          </button>
        </div>
      )}
    </div>
    </div>

  );
};

export default DeleteOrder;
