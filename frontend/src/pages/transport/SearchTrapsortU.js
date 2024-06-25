import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './SearchTransportU.css'; 
import Home2nav from '../../components/home2nav';


const SearchTransportForUpdate = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [transportData, setTransportData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTransportData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/transports/${encodeURIComponent(vehicleNumber)}`);
      if (response.status === 200) {
        setTransportData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Transport details not found");
        setTransportData(null);
      } else {
        setError("Error fetching transport details");
        setTransportData(null);
      }
    } catch (error) {
      setError("Error fetching transport details");
      setTransportData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchTransportData();
  };

  return (
    <div>
    <Home2nav />
    <div className="search-transport-container">
      <h2>Search For Update</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          placeholder="Enter vehicle number"
        />
        <button type="submit">Search</button>
        <Link to="/TransportManage" className="back-button">Back To Menu</Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      
      {transportData && (
        <div className="transport-details">
          <p><strong>Vehicle Number: </strong>{transportData.vehicle_number}</p>
          <p><strong>Vehicle Type: </strong>{transportData.vehicle_type}</p>
          <p><strong>Vehicle Brand Name: </strong>{transportData.vehicle_brandName}</p>
          <p><strong>Vehicle Condition: </strong>{transportData.vehicle_condition}</p>
          <p><strong>Vehicle Service Status: </strong>{transportData.vehicle_serviceStatus}</p>
          <p><strong>Vehicle Availability: </strong>{transportData.vehicle_availability}</p>

          {!loading && !error && (
            <Link to={`/transports/${transportData.vehicle_number}/UpdateTransport?vehicleNumber=${encodeURIComponent(vehicleNumber)}`}>
              <button className="update-button">Update Transport</button>
            </Link>
          )}
        </div>
      )}
    </div>
    </div>

  );
};

export default SearchTransportForUpdate;
