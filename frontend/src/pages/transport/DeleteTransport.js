import React, { useState } from "react";
import axios from "axios";
import "./DeleteTransport.css";
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';


const DeleteTransport = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [transportData, setTransportData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTransportData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/transports/${encodeURIComponent(vehicleNumber)}`
      );
      if (response.status === 200) {
        setTransportData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Transport not found");
        setTransportData(null);
      } else {
        setError("Transport not found");
        setTransportData(null);
      }
    } catch (error) {
      setError("Transport not found");
      setTransportData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchTransportData();
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/transports/${encodeURIComponent(vehicleNumber)}`);
      setTransportData(null);
      setError("Transport deleted successfully");
    } catch (error) {
      setError("Error deleting transport");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <Home2nav />
    <div className="delete-transport-container">
      <h2>Delete a Transport</h2>
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
        <Link to="/TransportManage" className="back-button">
          Back To Menu
        </Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}

      {transportData && (
        <div className="transport-details">
          <p>
            <strong>Vehicle Number: </strong>
            {transportData.vehicle_number}
          </p>
          <p>
            <strong>Vehicle Type: </strong>
            {transportData.vehicle_type}
          </p>
          <p>
            <strong>Brand Name: </strong>
            {transportData.vehicle_brandName}
          </p>
          <p>
            <strong>Condition: </strong>
            {transportData.vehicle_condition}
          </p>
          <p>
            <strong>Service Status: </strong>
            {transportData.vehicle_serviceStatus}
          </p>
          <p>
            <strong>Availability: </strong>
            {transportData.vehicle_availability}
          </p>
          <p>
            <strong>Driver Name: </strong>
            {transportData.driver_name}
          </p>
          <button onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete Transport"}
          </button>
        </div>
      )}
    </div>
    </div>

  );
};

export default DeleteTransport;
