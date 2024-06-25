import React, { useState } from "react";
import axios from "axios";
import "./DeleteorderedMaterial.css";
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';


const DeleteOrderedMaterial = () => {
  const [materialName, setMaterialName] = useState("");
  const [materialData, setMaterialData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMaterialData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/orderedMaterials/${encodeURIComponent(materialName)}`
      );
      if (response.status === 200) {
        setMaterialData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Ordered material not found");
        setMaterialData(null);
      } else {
        setError("Ordered material not found");
        setMaterialData(null);
      }
    } catch (error) {
      setError("Ordered material not found");
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
      await axios.delete(`/api/orderedMaterials/${encodeURIComponent(materialName)}`);
      setMaterialData(null);
      setError("Ordered material deleted successfully");
    } catch (error) {
      setError("Error deleting ordered material");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
            <Home2nav />
    <div className="delete-ordered-material-container">
      <h2>Delete an Ordered Material</h2>
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
        <Link to="/orderedMaterialManage" className="back-button">
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
            <strong>Orderd Quantity: </strong>
            {materialData.orderd_quantity}
          </p>
          <p>
            <strong>Supplier Name: </strong>
            {materialData.supplier_name}
          </p>
          <p>
            <strong>Orderd Cost: </strong>
            {materialData.ordred_cost}
          </p>
          <p>
            <strong>Orderd Status: </strong>
            {materialData.ordred_status}
          </p>
          <button onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete Ordered Material"}
          </button>
        </div>
      )}
    </div>
    </div>

  );
};

export default DeleteOrderedMaterial;
