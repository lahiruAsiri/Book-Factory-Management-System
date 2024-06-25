import React, { useState } from "react";
import axios from "axios";
import './AddOrder.css'; 

const AddOrder = () => {
  const [orderCustomer, setOrderCustomer] = useState("");
  const [orderedBooks, setOrderedBooks] = useState("");
  const [orderQuantity, setOrderQuantity] = useState("");
  const [orderAddress, setOrderAddress] = useState("");
  const [orderedDate, setOrderedDate] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Validation
      if (!orderCustomer.trim() || !orderedBooks.trim() || !orderAddress.trim() || !orderedDate.trim() || !deliveryStatus.trim()) {
        throw new Error("All fields are required");
      }
      if (!orderQuantity.trim() || isNaN(orderQuantity) || parseInt(orderQuantity) <= 0) {
        throw new Error("Order quantity must be a positive integer");
      }
      if (!/\d{4}\/\d{2}\/\d{2}/.test(orderedDate)) {
        throw new Error("Invalid ordered date format. Please use YYYY/MM/DD");
      }

      await axios.post("/api/orders", {
        order_coustermer: orderCustomer,
        ordered_books: orderedBooks,
        order_quantity: orderQuantity,
        order_adresses: orderAddress,
        ordered_date: orderedDate,
        delivery_status: deliveryStatus
      });
      setSuccess(true);
      setError(null);
      setOrderCustomer("");
      setOrderedBooks("");
      setOrderQuantity("");
      setOrderAddress("");
      setOrderedDate("");
      setDeliveryStatus("");
    } catch (error) {
      setError(error.message || "Error adding order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-order-container">
      <h2>Add New Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Customer Name:</label>
          <input
            type="text"
            value={orderCustomer}
            onChange={(e) => setOrderCustomer(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ordered Books:</label>
          <input
            type="text"
            value={orderedBooks}
            onChange={(e) => setOrderedBooks(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Order Quantity:</label>
          <input
            type="number"
            value={orderQuantity}
            onChange={(e) => setOrderQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Order Address:</label>
          <input
            type="text"
            value={orderAddress}
            onChange={(e) => setOrderAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ordered Date:</label>
          <input
            type="text"
            value={orderedDate}
            onChange={(e) => setOrderedDate(e.target.value)}
            placeholder="YYYY/MM/DD"
            required
          />
        </div>
        <div className="form-group">
          <label>Delivery Status:</label>
          <select
            value={deliveryStatus}
            onChange={(e) => setDeliveryStatus(e.target.value)}
            required
          >
            <option value="">Select Delivery Status</option>
            <option value="Delivered">Delivered</option>
            <option value="Not Delivered">Not Delivered</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Adding..." : "Add Order"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Order added successfully!</div>}
    </div>
  );
};

export default AddOrder;
