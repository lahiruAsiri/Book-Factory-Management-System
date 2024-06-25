import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './UpdateDelivery.css'; 
import Home2nav from '../../components/home2nav';


const UpdateDelivery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialVehicleNumber = queryParams.get("vehicleNumber");

  const [deliveryDetails, setDeliveryDetails] = useState({
    vehicle_number: initialVehicleNumber || "",
    vehicle_location: "",
    delivery_status: "" // Added delivery_status field
  });

  useEffect(() => {
    const fetchDeliveryDetails = async () => {
      try {
        const response = await axios.get(`/api/deliverys/${initialVehicleNumber}`);
        setDeliveryDetails(response.data);
      } catch (error) {
        console.error("Error fetching delivery details:", error);
      }
    };

    fetchDeliveryDetails();
  }, [initialVehicleNumber]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDeliveryDetails({ ...deliveryDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`/api/deliverys/${initialVehicleNumber}`, deliveryDetails);
      navigate("/SearchDeliveryU"); 
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
    <Home2nav />
    <div className="update-delivery-container">
      <h2>Update Delivery Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Vehicle Number:
          <input type="text" name="vehicle_number" value={deliveryDetails.vehicle_number} onChange={handleChange} />
        </label>
        <label>
          Vehicle Location:
          <input type="text" name="vehicle_location" value={deliveryDetails.vehicle_location} onChange={handleChange} />
        </label>
        <label>
          Delivery Status: {/* Added delivery status field */}
          <select name="delivery_status" value={deliveryDetails.delivery_status} onChange={handleChange}>
            <option value="Delivered">Delivered</option>
            <option value="Ongoing Delivering">Ongoing Delivering</option>
          </select>
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
    </div>

  );
};

export default UpdateDelivery;
