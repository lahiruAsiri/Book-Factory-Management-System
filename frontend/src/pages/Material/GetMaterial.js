import React, { useState } from "react";
import axios from "axios";
import "./getMaterial.css";

const GetMaterial = () => {
  const [materialName, setMaterialName] = useState("");
  const [materialDetails, setMaterialDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchMaterialDetails = async () => {
    try {
      const response = await axios.get(`/api/materials/${encodeURIComponent(materialName)}`);
      if (response.status === 200) {
        setMaterialDetails(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Material details not found");
        setMaterialDetails(null);
      } else {
        setError("Error fetching material data");
        setMaterialDetails(null);
      }
    } catch (error) {
      setError("Error fetching material data");
      setMaterialDetails(null);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    await fetchMaterialDetails();
  };

  return (
    <div className="get-material-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={materialName}
          onChange={(e) => setMaterialName(e.target.value)}
          placeholder="Enter material name"
        />
        <button type="submit">Search</button>
      </form>

      {error && <div className="error">{error}</div>}

      {materialDetails && (
        <div className="material-details">
          <h2>Material Details:</h2>
          <div>
            <p><strong>Material Name: </strong>{materialDetails.material_name}</p>
            <p><strong>Material Price: </strong>{materialDetails.material_price}</p>
            <p><strong>Material Quantity: </strong>{materialDetails.material_quantity}</p>
            <p><strong>Material Availability: </strong>{materialDetails.material_availability}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetMaterial;
