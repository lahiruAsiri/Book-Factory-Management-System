import React, { useState } from "react";
import axios from "axios";
import "./DeleteSM.css"; // Update import to the appropriate CSS file
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';


const DeleteSuppliedMaterial = () => {
  const [materialName, setMaterialName] = useState("");
  const [materialData, setMaterialData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMaterialData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/suppliedMaterials/${encodeURIComponent(materialName)}`
      );
      if (response.status === 200) {
        setMaterialData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Supplied material not found");
        setMaterialData(null);
      } else {
        setError("Supplied material not found");
        setMaterialData(null);
      }
    } catch (error) {
      setError("Supplied material not found");
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
      await axios.delete(`/api/suppliedMaterials/${encodeURIComponent(materialName)}`);
      setMaterialData(null);
      setError("Supplied material deleted successfully");
    } catch (error) {
      setError("Error deleting supplied material");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <Home2nav />
    <div className="delete-supplied-material-container">
      <h2>Delete a Supplied Material</h2>
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
        <Link to="/SMmanage" className="back-button">
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
            <strong>Receivered Section: </strong>
            {materialData.receivered_section}
          </p>
          <p>
            <strong>Quantity: </strong>
            {materialData.quantity}
          </p>
          <p>
            <strong>Date: </strong>
            {materialData.date}
          </p>
          <button onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete Supplied Material"}
          </button>
        </div>
      )}
    </div>
    </div>

  );
};

export default DeleteSuppliedMaterial;
