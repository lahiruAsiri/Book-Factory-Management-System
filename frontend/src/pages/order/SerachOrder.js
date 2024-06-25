import React, { useState } from "react";
import axios from "axios";
import "./GetOrder.css";

const GetOrder = () => {
  const [orderCustomer, setOrderCustomer] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`/api/orders/${encodeURIComponent(orderCustomer)}`);
      if (response.status === 200) {
        setOrderDetails(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Order not found");
        setOrderDetails(null);
      } else {
        setError("Error fetching order data");
        setOrderDetails(null);
      }
    } catch (error) {
      setError("Error fetching order data");
      setOrderDetails(null);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    await fetchOrderDetails();
  };

  return (
    <div className="get-order-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={orderCustomer}
          onChange={(e) => setOrderCustomer(e.target.value)}
          placeholder="Enter order customer name"
        />
        <button type="submit">Search</button>
      </form>

      {error && <div className="error">{error}</div>}

      {orderDetails && (
        <div className="order-details">
          <h2>Search Result:</h2>
          <div>
            <p><strong>Order Customer: </strong>{orderDetails.order_coustermer}</p>
            <p><strong>Ordered Books: </strong>{orderDetails.ordered_books}</p>
            <p><strong>Order Quantity: </strong>{orderDetails.order_quantity}</p>
            <p><strong>Order Address: </strong>{orderDetails.order_adresses}</p>
            <p><strong>Ordered Date: </strong>{orderDetails.ordered_date}</p>
            <p><strong>Delivery Status: </strong>{orderDetails.delivery_status}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetOrder;
