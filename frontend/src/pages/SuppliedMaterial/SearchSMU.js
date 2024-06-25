import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './SearchSMU.css'; 
import Home2nav from '../../components/home2nav';


const SearchMaterialForUpdate = () => {
  const [materialName, setMaterialName] = useState("");
  const [materialData, setMaterialData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMaterialData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/suppliedMaterials/${encodeURIComponent(materialName)}`);
      if (response.status === 200) {
        setMaterialData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Supplied material details not found");
        setMaterialData(null);
      } else {
        setError("Error fetching supplied material details");
        setMaterialData(null);
      }
    } catch (error) {
      setError("Error fetching supplied material details");
      setMaterialData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchMaterialData();
  };

  return (
    <div>
    <Home2nav />
    <div className="search-material-container">
      <h2>Search For Update</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={materialName}
          onChange={(e) => setMaterialName(e.target.value)}
          placeholder="Enter material name"
        />
        <button type="submit">Search</button>
        <Link to="/SMmanage" className="back-button">Back To Menu</Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      
      {materialData && (
        <div className="material-details">
          <p><strong>Material Name: </strong>{materialData.material_name}</p>
          <p><strong>Received Section: </strong>{materialData.receivered_section}</p>
          <p><strong>Quantity: </strong>{materialData.quantity}</p>
          <p><strong>Date: </strong>{materialData.date}</p>

          {!loading && !error && (
            <Link to={`/suppliedMaterials/${materialData.material_name}/UpdateSM?materialName=${encodeURIComponent(materialName)}`}>
              <button className="update-button">Update Material</button>
            </Link>
          )}
        </div>
      )}
    </div>
    </div>

  );
};

export default SearchMaterialForUpdate;
