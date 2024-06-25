import React, { useState } from "react";
import axios from "axios";
import './AddorderedMaterial.css'; 

const AddOrderedMaterial = () => {
  const [materialName, setMaterialName] = useState("");
  const [orderQuantity, setOrderQuantity] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [orderedCost, setOrderedCost] = useState("");
  const [orderedStatus, setOrderedStatus] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Client-side validation
      if (!materialName || !orderQuantity || !supplierName || !orderedCost || !orderedStatus) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      // Convert orderQuantity and orderedCost to numbers
      const quantity = parseInt(orderQuantity);
      const cost = parseFloat(orderedCost);

      if (isNaN(quantity) || quantity <= 0 || isNaN(cost) || cost <= 0) {
        setError("Invalid quantity or cost");
        setLoading(false);
        return;
      }

      await axios.post("/api/orderedMaterials", {
        material_name: materialName,
        orderd_quantity: quantity,
        supplier_name: supplierName,
        ordred_cost: cost,
        ordred_status: orderedStatus
      });
      
      setSuccess(true);
      setError(null);
      setMaterialName("");
      setOrderQuantity("");
      setSupplierName("");
      setOrderedCost("");
      setOrderedStatus("");
    } catch (error) {
      setError("Error adding ordered material");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-material-container">
      <h2>Add New Ordered Material</h2>
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
          <label>Ordered Quantity:</label>
          <input
            type="number" // Change type to "number" for numerical input
            value={orderQuantity}
            onChange={(e) => setOrderQuantity(e.target.value)}
            required
            min="1" // Set minimum value
          />
        </div>
        <div className="form-group">
          <label>Supplier Name:</label>
          <input
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ordered Cost:</label>
          <input
            type="number" // Change type to "number" for numerical input
            value={orderedCost}
            onChange={(e) => setOrderedCost(e.target.value)}
            required
            min="0.01" // Set minimum value
            step="0.01" // Set step for decimal places
          />
        </div>
        <div className="form-group">
          <label>Ordered Status:</label>
          <select
            value={orderedStatus}
            onChange={(e) => setOrderedStatus(e.target.value)}
            required
          >
            <option value="">Select Ordered Status</option>
            <option value="Delivered">Delivered</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Adding..." : "Add Ordered Material"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Ordered material added successfully!</div>}
    </div>
  );
};

export default AddOrderedMaterial;
