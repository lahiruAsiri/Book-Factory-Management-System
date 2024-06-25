import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './SerachOrderUpdate.css'; 
import Home2nav from '../../components/home2nav';


const SearchOrderForUpdate = () => {
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
        setError("Error fetching order data");
        setOrderData(null);
      }
    } catch (error) {
      setError("Error fetching order data");
      setOrderData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchOrderData();
  };

  return (
    <div>
    <Home2nav />
    <div className="search-order-container">
      <h2>Search For Update</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={orderCustomer}
          onChange={(e) => setOrderCustomer(e.target.value)}
          placeholder="Enter customer name"
        />
        <button type="submit">Search</button>
        <Link to="/OrderManage" className="back-button">Back To Menu</Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      
      {orderData && (
        <div className="order-details">
          <p><strong>Customer Name: </strong>{orderData.order_coustermer}</p>
          <p><strong>Ordered Books: </strong>{orderData.ordered_books}</p>
          <p><strong>Order Quantity: </strong>{orderData.order_quantity}</p>
          <p><strong>Order Address: </strong>{orderData.order_address}</p>
          <p><strong>Ordered Date: </strong>{orderData.ordered_date}</p>
          <p><strong>Delivery Status: </strong>{orderData.delivery_status}</p>

          {!loading && !error && (
            <Link to={`/orders/${orderData.order_customer}/UpdateOrder?orderCustomer=${encodeURIComponent(orderCustomer)}`}>
              <button className="update-button">Update Order</button>
            </Link>
          )}
        </div>
      )}
    </div>
    </div>

  );
};

export default SearchOrderForUpdate;
