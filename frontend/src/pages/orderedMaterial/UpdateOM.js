import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './UpdateOM.css'; // Update import to UpdateOrderedMaterial.css
import Home2nav from '../../components/home2nav';


const UpdateOrderedMaterial = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialMaterialName = queryParams.get("materialName");

  const [materialDetails, setMaterialDetails] = useState({
    material_name: initialMaterialName || "",
    orderd_quantity: "", // Corrected field name
    supplier_name: "", 
    ordered_cost: "", 
    ordered_status: "" 
  });

  useEffect(() => {
    const fetchMaterialDetails = async () => {
      try {
        const response = await axios.get(`/api/orderedMaterials/${initialMaterialName}`); // Update endpoint to fetch ordered materials
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
      await axios.patch(`/api/orderedMaterials/${initialMaterialName}`, materialDetails); // Update endpoint to patch ordered materials
      navigate("/SearchOMU"); // Update navigation destination
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
            <Home2nav />
    <div className="update-ordered-material-container">
      <h2>Update Ordered Material Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Material Name:
          <input type="text" name="material_name" value={materialDetails.material_name} onChange={handleChange} />
        </label>
        <label>
          Ordered Quantity:
          <input type="text" name="orderd_quantity" value={materialDetails.orderd_quantity} onChange={handleChange} />
        </label>
        <label>
          Supplier Name:
          <input type="text" name="supplier_name" value={materialDetails.supplier_name} onChange={handleChange} />
        </label>
        <label>
          Ordered Cost:
          <input type="Number" name="ordred_cost" value={materialDetails.ordred_cost} onChange={handleChange} />
        </label>
        <label>
          Ordered Status:
          <select name="ordred_status" value={materialDetails.ordred_status} onChange={handleChange}>
            <option value="">Select Ordered Status</option>
            <option value="Delivered">Delivered</option>
            <option value="Pending">Pending</option>
          </select>
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
    </div>

  );
};

export default UpdateOrderedMaterial;
