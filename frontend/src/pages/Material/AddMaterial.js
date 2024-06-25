import React, { useState } from "react";
import axios from "axios";
import './AddMaterial.css'; 

const AddMaterial = () => {
  const [materialName, setMaterialName] = useState("");
  const [materialPrice, setMaterialPrice] = useState("");
  const [materialQuantity, setMaterialQuantity] = useState("");
  const [materialAvailability, setMaterialAvailability] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Client-side validation
      if (!materialName || !materialPrice || !materialQuantity || !materialAvailability) {
        setError("All fields are required");
        setLoading(false);
        return;
      }
      
      // Convert materialPrice to a number
      const price = parseFloat(materialPrice);
      if (isNaN(price) || price <= 0) {
        setError("Invalid material price");
        setLoading(false);
        return;
      }

      // Convert materialQuantity to a number
      const quantity = parseInt(materialQuantity);
      if (isNaN(quantity) || quantity <= 0) {
        setError("Invalid material quantity");
        setLoading(false);
        return;
      }

      await axios.post("/api/materials", {
        material_name: materialName,
        material_price: price,
        material_quantity: quantity,
        material_availability: materialAvailability
      });
      
      setSuccess(true);
      setError(null);
      setMaterialName("");
      setMaterialPrice("");
      setMaterialQuantity("");
      setMaterialAvailability("");
    } catch (error) {
      setError("Error adding material");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-material-container">
      <h2>Add New Material</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Material Name:</label>
          <input
            type="text"
            value={materialName}
            onChange={(e) => setMaterialName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Material Price -per 1kg or one piece:</label>
          <input
            type="number" // Change type to "number" for numerical input
            value={materialPrice}
            onChange={(e) => setMaterialPrice(e.target.value)}
            required
            min="0.01" // Set minimum value
            step="0.01" // Set step for decimal places
          />
        </div>
        <div className="form-group">
          <label>Material Quantity:</label>
          <input
            type="number" // Change type to "number" for numerical input
            value={materialQuantity}
            onChange={(e) => setMaterialQuantity(e.target.value)}
            required
            min="1" // Set minimum value
          />
        </div>
        <div className="form-group">
          <label>Material Availability:</label>
          <select
            value={materialAvailability}
            onChange={(e) => setMaterialAvailability(e.target.value)}
            required
          >
            <option value="">Select Material Availability</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Adding..." : "Add Material"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Material added successfully!</div>}
    </div>
  );
};

export default AddMaterial;
