import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './UpdateMaterial.css'; 
import Home2nav from '../../components/home2nav';


const UpdateMaterial = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialMaterialName = queryParams.get("materialName");

  const [materialDetails, setMaterialDetails] = useState({
    material_name: initialMaterialName || "",
    material_price: "",
    material_quantity: "",
    material_availability: "" // Added material_availability field
  });

  useEffect(() => {
    const fetchMaterialDetails = async () => {
      try {
        const response = await axios.get(`/api/materials/${initialMaterialName}`);
        setMaterialDetails(response.data);
      } catch (error) {
        console.error("Error fetching material details:", error);
      }
    };

    fetchMaterialDetails();
  }, [initialMaterialName]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMaterialDetails({ ...materialDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`/api/materials/${initialMaterialName}`, materialDetails);
      navigate("/SearchMaterialU"); 
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
            <Home2nav />
    <div className="update-material-container">
      <h2>Update Material Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Material Name:
          <input type="text" name="material_name" value={materialDetails.material_name} onChange={handleChange} />
        </label>
        <label>
          Material Price:
          <input type="text" name="material_price" value={materialDetails.material_price} onChange={handleChange} />
        </label>
        <label>
          Material Quantity:
          <input type="text" name="material_quantity" value={materialDetails.material_quantity} onChange={handleChange} />
        </label>
        <label>
          Material Availability: {/* Added material availability field */}
          <select name="material_availability" value={materialDetails.material_availability} onChange={handleChange}>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
    </div>

  );
};

export default UpdateMaterial;
