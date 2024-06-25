import React, { useState } from "react";
import axios from "axios";
import './AddDelivery.css'; 

const AddDelivery = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleLocation, setVehicleLocation] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Client-side validation
      if (!vehicleNumber || !vehicleLocation || !deliveryStatus) {
        setError("All fields are required");
        setLoading(false);
        return;
      }
      
      await axios.post("/api/deliverys", {
        vehicle_number: vehicleNumber,
        vehicle_location: vehicleLocation,
        delivery_status: deliveryStatus
      });
      
      setSuccess(true);
      setError(null);
      setVehicleNumber("");
      setVehicleLocation("");
      setDeliveryStatus("");
    } catch (error) {
      setError("Error adding delivery");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-delivery-container">
      <h2>Add New Delivery</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Vehicle Number:</label>
          <input
            type="text"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Vehicle Location:</label>
          <input
            type="text"
            value={vehicleLocation}
            onChange={(e) => setVehicleLocation(e.target.value)}
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
            <option value="Ongoing Delivering">Ongoing Delivering</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Adding..." : "Add Delivery"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Delivery added successfully!</div>}
    </div>
  );
};

export default AddDelivery;
