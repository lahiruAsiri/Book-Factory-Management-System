import React, { useState } from "react";
import axios from "axios";
import './AddTransport.css'; 

const AddTransport = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleBrandName, setVehicleBrandName] = useState("");
  const [vehicleCondition, setVehicleCondition] = useState("");
  const [vehicleServiceStatus, setVehicleServiceStatus] = useState("");
  const [vehicleAvailability, setVehicleAvailability] = useState("");
  const [driverName, setDriverName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Client-side validation
      if (!vehicleNumber || !vehicleType || !vehicleBrandName || !vehicleCondition || !vehicleServiceStatus || !vehicleAvailability || !driverName) {
        setError("All fields are required");
        setLoading(false);
        return;
      }
      
      await axios.post("/api/transports", {
        vehicle_number: vehicleNumber,
        vehicle_type: vehicleType,
        vehicle_brandName: vehicleBrandName,
        vehicle_condition: vehicleCondition,
        vehicle_serviceStatus: vehicleServiceStatus,
        vehicle_availability: vehicleAvailability,
        driver_name: driverName
      });
      
      setSuccess(true);
      setError(null);
      setVehicleNumber("");
      setVehicleType("");
      setVehicleBrandName("");
      setVehicleCondition("");
      setVehicleServiceStatus("");
      setVehicleAvailability("");
      setDriverName("");
    } catch (error) {
      setError("Error adding transport");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-transport-container">
      <h2>Add New Transport</h2>
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
          <label>Vehicle Type:</label>
          <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} required>
            <option value="">Select</option>
            <option value="van">Van</option>
            <option value="lorry">Lorry</option>
          </select>
        </div>
        <div className="form-group">
          <label>Vehicle Brand Name:</label>
          <input
            type="text"
            value={vehicleBrandName}
            onChange={(e) => setVehicleBrandName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Vehicle Condition:</label>
          <select
            value={vehicleCondition}
            onChange={(e) => setVehicleCondition(e.target.value)}
            required
          >
            <option value="">Select Condition</option>
            <option value="Good">Good</option>
            <option value="Not Good">Not Good</option>
          </select>
        </div>
        <div className="form-group">
          <label>Vehicle Service Status:</label>
          <input
            type="text"
            value={vehicleServiceStatus}
            onChange={(e) => setVehicleServiceStatus(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Vehicle Availability:</label>
          <select
            value={vehicleAvailability}
            onChange={(e) => setVehicleAvailability(e.target.value)}
            required
          >
            <option value="">Select Availability</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>
        <div className="form-group">
          <label>Driver Name:</label>
          <input
            type="text"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Adding..." : "Add Transport"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Transport added successfully!</div>}
    </div>
  );
};

export default AddTransport;
