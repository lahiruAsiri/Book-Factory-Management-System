import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './SearchOMU.css'; 
import Home2nav from '../../components/home2nav';


const SearchOrderedMaterialForUpdate = () => {
  const [materialName, setMaterialName] = useState("");
  const [materialData, setMaterialData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMaterialData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/orderedMaterials/${encodeURIComponent(materialName)}`);
      if (response.status === 200) {
        setMaterialData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Ordered material details not found");
        setMaterialData(null);
      } else {
        setError("Error fetching ordered material details");
        setMaterialData(null);
      }
    } catch (error) {
      setError("Error fetching ordered material details");
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
    <div className="search-ordered-material-container">
      <h2>Search For Update</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={materialName}
          onChange={(e) => setMaterialName(e.target.value)}
          placeholder="Enter material name"
        />
        <button type="submit">Search</button>
        <Link to="/orderedMaterialmanage" className="back-button">Back To Menu</Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      
      {materialData && (
        <div className="material-details">
          <p><strong>Material Name: </strong>{materialData.material_name}</p>
          <p><strong>Orderd Quantity: </strong>{materialData.ordered_quantity}</p>
          <p><strong>Supplier Name: </strong>{materialData.supplier_name}</p>
          <p><strong>Ordered Cost: </strong>{materialData.ordred_cost}</p>
          <p><strong>Ordered Status: </strong>{materialData.ordred_status}</p>

          {!loading && !error && (
            <Link to={`/orderedMaterials/${materialData.material_name}/UpdateOM?materialName=${encodeURIComponent(materialName)}`}>
              <button className="update-button">Update Ordered Material</button>
            </Link>
          )}
        </div>
      )}
    </div>
    </div>

  );
};

export default SearchOrderedMaterialForUpdate;
