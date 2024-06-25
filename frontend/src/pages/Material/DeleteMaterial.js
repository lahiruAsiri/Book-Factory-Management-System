import React, { useState } from "react";
import axios from "axios";
import "./Deletematerial.css";
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';


const DeleteMaterial = () => {
  const [materialName, setMaterialName] = useState("");
  const [materialData, setMaterialData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMaterialData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/materials/${encodeURIComponent(materialName)}`
      );
      if (response.status === 200) {
        setMaterialData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Material not found");
        setMaterialData(null);
      } else {
        setError("Material not found");
        setMaterialData(null);
      }
    } catch (error) {
      setError("Material not found");
      setMaterialData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchMaterialData();
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/materials/${encodeURIComponent(materialName)}`);
      setMaterialData(null);
      setError("Material deleted successfully");
    } catch (error) {
      setError("Error deleting material");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
            <Home2nav />
    <div className="delete-material-container">
      <h2>Delete a Material</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={materialName}
          onChange={(e) => setMaterialName(e.target.value)}
          placeholder="Enter material name"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
        <Link to="/MaterialManage" className="back-button">
          Back To Menu
        </Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}

      {materialData && (
        <div className="material-details">
          <p>
            <strong>Material Name: </strong>
            {materialData.material_name}
          </p>
          <p>
            <strong>Material Price: </strong>
            {materialData.material_price}
          </p>
          <p>
            <strong>Material Quantity: </strong>
            {materialData.material_quantity}
          </p>
          <p>
            <strong>Material Availability: </strong>
            {materialData.material_availability}
          </p>
          <button onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete Material"}
          </button>
        </div>
      )}
    </div>
    </div>

  );
};

export default DeleteMaterial;
