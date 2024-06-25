import React, { useState } from "react";
import axios from "axios";
import "./DeleteDelivery.css";
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';


const DeleteDelivery = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [deliveryData, setDeliveryData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDeliveryData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/deliverys/${encodeURIComponent(vehicleNumber)}`
      );
      if (response.status === 200) {
        setDeliveryData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Delivery not found");
        setDeliveryData(null);
      } else {
        setError("Delivery not found");
        setDeliveryData(null);
      }
    } catch (error) {
      setError("Delivery not found");
      setDeliveryData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchDeliveryData();
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/deliverys/${encodeURIComponent(vehicleNumber)}`);
      setDeliveryData(null);
      setError("Delivery deleted successfully");
    } catch (error) {
      setError("Error deleting delivery");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <Home2nav />
    <div className="delete-delivery-container">
      <h2>Delete a Delivery</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          placeholder="Enter vehicle number"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
        <Link to="/DeliveryManage" className="back-button">
          Back To Menu
        </Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}

      {deliveryData && (
        <div className="delivery-details">
          <p>
            <strong>Vehicle Number: </strong>
            {deliveryData.vehicle_number}
          </p>
          <p>
            <strong>Vehicle Location: </strong>
            {deliveryData.vehicle_location}
          </p>
          <p>
            <strong>Delivery Status: </strong>
            {deliveryData.delivery_status}
          </p>
          <button onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete Delivery"}
          </button>
        </div>
      )}
    </div>
    </div>

  );
};

export default DeleteDelivery;
