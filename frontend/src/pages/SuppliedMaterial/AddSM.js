import React, { useState } from "react";
import axios from "axios";
import './AddSM.css'; // Corrected import statement

const AddSuppliedMaterial = () => {
  const [materialName, setMaterialName] = useState("");
  const [receiveredSection, setReceiveredSection] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Client-side validation
      if (!materialName || !receiveredSection || !quantity || !date) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      // Validate quantity to be a positive integer
      const quantityValue = parseInt(quantity);
      if (isNaN(quantityValue) || quantityValue <= 0) {
        setError("Quantity must be a positive integer");
        setLoading(false);
        return;
      }

     

      await axios.post("/api/suppliedMaterials", {
        material_name: materialName,
        receivered_section: receiveredSection,
        quantity: quantityValue,
        date: date
      });

      setSuccess(true);
      setError(null);
      setMaterialName("");
      setReceiveredSection("");
      setQuantity("");
      setDate("");
    } catch (error) {
      setError("Error adding supplied material");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-supplied-material-container">
      <h2>Add New Supplied Material</h2>
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
          <label>Receivered Section:</label>
          <input
            type="text"
            value={receiveredSection}
            onChange={(e) => setReceiveredSection(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number" // Change type to "number" for numerical input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="1" // Set minimum value
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Adding..." : "Add Supplied Material"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Supplied material added successfully!</div>}
    </div>
  );
};

export default AddSuppliedMaterial;
