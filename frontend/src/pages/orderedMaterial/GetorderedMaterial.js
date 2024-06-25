import React, { useState } from "react";
import axios from "axios";
import "./GetorderedMaterial.css";

const GetOrderedMaterial = () => {
  const [materialName, setMaterialName] = useState("");
  const [materialDetails, setMaterialDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchMaterialDetails = async () => {
    try {
      const response = await axios.get(`/api/orderedMaterials/${encodeURIComponent(materialName)}`);
      if (response.status === 200) {
        setMaterialDetails(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Ordered material details not found");
        setMaterialDetails(null);
      } else {
        setError("Error fetching ordered material data");
        setMaterialDetails(null);
      }
    } catch (error) {
      setError("Error fetching ordered material data");
      setMaterialDetails(null);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    await fetchMaterialDetails();
  };

  return (
    <div className="get-ordered-material-container">
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
          <h2>Ordered Material Details:</h2>
          <div>
            <p><strong>Material Name: </strong>{materialDetails.material_name}</p>
            <p><strong>Ordered Quantity: </strong>{materialDetails.orderd_quantity}</p>
            <p><strong>Supplier Name: </strong>{materialDetails.supplier_name}</p>
            <p><strong>Ordered Cost: </strong>{materialDetails.ordred_cost}</p>
            <p><strong>Ordered Status: </strong>{materialDetails.ordred_status}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetOrderedMaterial;
