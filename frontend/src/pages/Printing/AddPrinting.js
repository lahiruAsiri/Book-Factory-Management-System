import React, { useState } from "react";
import axios from "axios";
import './AddPrinting.css'; 

const AddPrinting = () => {
  const [printingBookName, setPrintingBookName] = useState("");
  const [printingQuantity, setPrintingQuantity] = useState("");
  const [needMaterial, setNeedMaterial] = useState("");
  const [printingStatus, setPrintingStatus] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Validation
      if (!printingBookName.trim() || !needMaterial.trim()) {
        throw new Error("Book name and material details are required");
      }
      if (!printingQuantity.trim() || isNaN(printingQuantity) || parseInt(printingQuantity) <= 0) {
        throw new Error("Printing quantity must be a positive integer");
      }

      await axios.post("/api/printingmanages", {
        printing_bookName: printingBookName,
        printing_quantity: printingQuantity,
        need_material: needMaterial,
        printing_status: printingStatus
      });
      setSuccess(true);
      setError(null);
      setPrintingBookName("");
      setPrintingQuantity("");
      setNeedMaterial("");
      setPrintingStatus("");
    } catch (error) {
      setError(error.message || "Error adding printing details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-printing-container">
      <h2>Add New Printing Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Book Name:</label>
          <input
            type="text"
            value={printingBookName}
            onChange={(e) => setPrintingBookName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Printing Quantity:</label>
          <input
            type="number"
            value={printingQuantity}
            onChange={(e) => setPrintingQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Need Material:</label>
          <input
            type="text"
            value={needMaterial}
            onChange={(e) => setNeedMaterial(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Printing Status:</label>
          <select
            value={printingStatus}
            onChange={(e) => setPrintingStatus(e.target.value)}
            required
          >
            <option value="">Select Printing Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Adding..." : "Add Printing Details"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Printing details added successfully!</div>}
    </div>
  );
};

export default AddPrinting;
