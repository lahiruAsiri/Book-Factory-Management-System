import React, { useState } from "react";
import axios from "axios";
import "./GetDelivery.css";

const GetDelivery = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchDeliveryDetails = async () => {
    try {
      const response = await axios.get(`/api/deliverys/${encodeURIComponent(vehicleNumber)}`);
      if (response.status === 200) {
        setDeliveryDetails(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Delivery details not found");
        setDeliveryDetails(null);
      } else {
        setError("Error fetching delivery data");
        setDeliveryDetails(null);
      }
    } catch (error) {
      setError("Error fetching delivery data");
      setDeliveryDetails(null);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    await fetchDeliveryDetails();
  };

  return (
    <div className="get-delivery-container">
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

      {deliveryDetails && (
        <div className="delivery-details">
          <h2>Search Result:</h2>
          <div>
            <p><strong>Vehicle Number: </strong>{deliveryDetails.vehicle_number}</p>
            <p><strong>Vehicle Location: </strong>{deliveryDetails.vehicle_location}</p>
            <p><strong>Delivery Status: </strong>{deliveryDetails.delivery_status}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetDelivery;
