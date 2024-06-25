import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './Updatetransport.css'; 
import Home2nav from '../../components/home2nav';


const UpdateTransport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialVehicleNumber = queryParams.get("vehicleNumber");

  const [transportDetails, setTransportDetails] = useState({
    vehicle_number: initialVehicleNumber || "",
    vehicle_type: "",
    vehicle_brandName: "",
    vehicle_condition: "",
    vehicle_serviceStatus: "",
    vehicle_availability: "",
    driver_name: ""
  });

  useEffect(() => {
    const fetchTransportDetails = async () => {
      try {
        const response = await axios.get(`/api/transports/${initialVehicleNumber}`);
        setTransportDetails(response.data);
      } catch (error) {
        console.error("Error fetching transport details:", error);
      }
    };

    fetchTransportDetails();
  }, [initialVehicleNumber]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTransportDetails({ ...transportDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`/api/transports/${initialVehicleNumber}`, transportDetails);
      navigate("/SearchTransportU"); 
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
    <Home2nav />
    <div className="update-transport-container">
      <h2>Update Transport Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Vehicle Number:
          <input type="text" name="vehicle_number" value={transportDetails.vehicle_number} onChange={handleChange} />
        </label>
        <label>
          Vehicle Type:
          <input type="text" name="vehicle_type" value={transportDetails.vehicle_type} onChange={handleChange} />
        </label>
        <label>
          Vehicle Brand Name:
          <input type="text" name="vehicle_brandName" value={transportDetails.vehicle_brandName} onChange={handleChange} />
        </label>
        <label>
          Vehicle Condition:
          <select name="vehicle_condition" value={transportDetails.vehicle_condition} onChange={handleChange}>
             <option value="Good">Good</option>
            <option value="Not Good">Not Good</option>
          </select>
        </label>
        <label>
          Vehicle Service Status:
          <input type="text" name="vehicle_serviceStatus" value={transportDetails.vehicle_serviceStatus} onChange={handleChange} />
        </label>
        <label>
          Vehicle Availability:
         <select name="vehicle_availability" value={transportDetails.vehicle_availability} onChange={handleChange}>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </label>
        <label>
          Driver Name:
          <input type="text" name="driver_name" value={transportDetails.driver_name} onChange={handleChange} />
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
    </div>

  );
};

export default UpdateTransport;
