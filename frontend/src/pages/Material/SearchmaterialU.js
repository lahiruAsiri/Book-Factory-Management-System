import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './SearchMaterialU.css'; 
import Home2nav from '../../components/home2nav';


const SearchMaterialForUpdate = () => {
  const [materialName, setMaterialName] = useState("");
  const [materialData, setMaterialData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMaterialData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/materials/${encodeURIComponent(materialName)}`);
      if (response.status === 200) {
        setMaterialData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Material details not found");
        setMaterialData(null);
      } else {
        setError("Error fetching material details");
        setMaterialData(null);
      }
    } catch (error) {
      setError("Error fetching material details");
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
        <Link to="/MaterialManage" className="back-button">Back To Menu</Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      
      {materialData && (
        <div className="material-details">
          <p><strong>Material Name: </strong>{materialData.material_name}</p>
          <p><strong>Material Price: </strong>{materialData.material_price}</p>
          <p><strong>Material Quantity: </strong>{materialData.material_quantity}</p>
          <p><strong>Material Availability: </strong>{materialData.material_availability}</p>

          {!loading && !error && (
            <Link to={`/materials/${materialData.material_name}/UpdateMaterial?materialName=${encodeURIComponent(materialName)}`}>
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
