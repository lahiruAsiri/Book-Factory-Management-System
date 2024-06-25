import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './SearchDeliveryU.css'; 
import Home2nav from '../../components/home2nav';


const SearchDeliveryForUpdate = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [deliveryData, setDeliveryData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDeliveryData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/deliverys/${encodeURIComponent(vehicleNumber)}`);
      if (response.status === 200) {
        setDeliveryData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Delivery details not found");
        setDeliveryData(null);
      } else {
        setError("Error fetching delivery details");
        setDeliveryData(null);
      }
    } catch (error) {
      setError("Error fetching delivery details");
      setDeliveryData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchDeliveryData();
  };

  return (
    <div>
    <Home2nav />
    <div className="search-delivery-container">
      <h2>Search For Update</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          placeholder="Enter vehicle number"
        />
        <button type="submit">Search</button>
        <Link to="/DeliveryManage" className="back-button">Back To Menu</Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      
      {deliveryData && (
        <div className="delivery-details">
          <p><strong>Vehicle Number: </strong>{deliveryData.vehicle_number}</p>
          <p><strong>Vehicle Location: </strong>{deliveryData.vehicle_location}</p>
          <p><strong>Delivery Status: </strong>{deliveryData.delivery_status}</p>

          {!loading && !error && (
            <Link to={`/deliverys/${deliveryData.vehicle_number}/UpdateDelivery?vehicleNumber=${encodeURIComponent(vehicleNumber)}`}>
              <button className="update-button">Update Delivery</button>
            </Link>
          )}
        </div>
      )}
    </div>
    </div>

  );
};

export default SearchDeliveryForUpdate;
