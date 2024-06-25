import React, { useState } from "react";
import axios from "axios";
import "./GetTransport.css";

const GetTransport = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [transportDetails, setTransportDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchTransportDetails = async () => {
    try {
      const response = await axios.get(`/api/transports/${encodeURIComponent(vehicleNumber)}`);
      if (response.status === 200) {
        setTransportDetails(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Transport details not found");
        setTransportDetails(null);
      } else {
        setError("Error fetching transport data");
        setTransportDetails(null);
      }
    } catch (error) {
      setError("Error fetching transport data");
      setTransportDetails(null);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    await fetchTransportDetails();
  };

  return (
    <div className="get-transport-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          placeholder="Enter vehicle number"
        />
        <button type="submit">Search</button>
      </form>

      {error && <div className="error">{error}</div>}

      {transportDetails && (
        <div className="transport-details">
          <h2>Search Result:</h2>
          <div>
            <p><strong>Vehicle Number: </strong>{transportDetails.vehicle_number}</p>
            <p><strong>Vehicle Type: </strong>{transportDetails.vehicle_type}</p>
            <p><strong>Vehicle Brand: </strong>{transportDetails.vehicle_brandName}</p>
            <p><strong>Vehicle Condition: </strong>{transportDetails.vehicle_condition}</p>
            <p><strong>Service Status: </strong>{transportDetails.vehicle_serviceStatus}</p>
            <p><strong>Availability: </strong>{transportDetails.vehicle_availability}</p>
            <p><strong>Driver Name: </strong>{transportDetails.driver_name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetTransport;
