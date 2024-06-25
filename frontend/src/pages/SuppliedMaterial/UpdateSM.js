import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './UpdateSM.css'; 
import Home2nav from '../../components/home2nav';


const UpdateMaterial = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialMaterialName = queryParams.get("materialName");

  const [materialDetails, setMaterialDetails] = useState({
    material_name: initialMaterialName || "",
    receivered_section: "",
    quantity: "",
    date: ""
  });

  useEffect(() => {
    const fetchMaterialDetails = async () => {
      try {
        const response = await axios.get(`/api/suppliedMaterials/${initialMaterialName}`);    
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
      await axios.patch(`/api/suppliedMaterials/${initialMaterialName}`, materialDetails);
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
          Receivered Section:
          <input type="text" name="receivered_section" value={materialDetails.receivered_section} onChange={handleChange} />
        </label>
        <label>
          Quantity:
          <input type="text" name="quantity" value={materialDetails.quantity} onChange={handleChange} />
        </label>
        <label>
          Date:
          <input type="text" name="date" value={materialDetails.date} onChange={handleChange} />
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
    </div>

  );
};

export default UpdateMaterial;
