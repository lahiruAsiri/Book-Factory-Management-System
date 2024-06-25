import React, { useState } from "react";
import axios from "axios";
import "./GetSM.css"; // Update import to match your CSS file

const GetSuppliedMaterial = () => {
  const [materialName, setMaterialName] = useState("");
  const [materialDetails, setMaterialDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchMaterialDetails = async () => {
    try {
      const response = await axios.get(`/api/suppliedMaterials/${encodeURIComponent(materialName)}`);
      if (response.status === 200) {
        setMaterialDetails(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Supplied material details not found");
        setMaterialDetails(null);
      } else {
        setError("Error fetching supplied material data");
        setMaterialDetails(null);
      }
    } catch (error) {
      setError("Error fetching supplied material data");
      setMaterialDetails(null);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    await fetchMaterialDetails();
  };

  return (
    <div className="get-supplied-material-container">
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
          <h2>Supplied Material Details:</h2>
          <div>
            <p><strong>Material Name: </strong>{materialDetails.material_name}</p>
            <p><strong>Receivered Section: </strong>{materialDetails.receivered_section}</p>
            <p><strong>Quantity: </strong>{materialDetails.quantity}</p>
            <p><strong>Date: </strong>{materialDetails.date}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetSuppliedMaterial;
