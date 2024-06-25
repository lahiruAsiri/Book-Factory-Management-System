import React, { useState } from "react";
import axios from "axios";
import "./DeletePrinting.css";
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';


const DeletePrinting = () => {
  const [printingBookName, setPrintingBookName] = useState("");
  const [printingData, setPrintingData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPrintingData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/printingmanages/${encodeURIComponent(printingBookName)}`
      );
      if (response.status === 200) {
        setPrintingData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Printing not found");
        setPrintingData(null);
      } else {
        setError("Printing not found");
        setPrintingData(null);
      }
    } catch (error) {
      setError("Printing not found");
      setPrintingData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchPrintingData();
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/printingmanages/${encodeURIComponent(printingBookName)}`);
      setPrintingData(null);
      setError("Printing deleted successfully");
    } catch (error) {
      setError("Error deleting printing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <Home2nav />
    <div className="delete-printing-container">
      <h2>Delete a Printing</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={printingBookName}
          onChange={(e) => setPrintingBookName(e.target.value)}
          placeholder="Enter book name"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
        <Link to="/PrintingManage" className="back-button">
          Back To Menu
        </Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}

      {printingData && (
        <div className="printing-details">
          <p>
            <strong>Book Name: </strong>
            {printingData.printing_bookName}
          </p>
          <p>
            <strong>Quantity: </strong>
            {printingData.printing_quantity}
          </p>
          <p>
            <strong>Material Needed: </strong>
            {printingData.need_material}
          </p>
          <p>
            <strong>Status: </strong>
            {printingData.printing_status}
          </p>
          <button onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete Printing"}
          </button>
        </div>
      )}
    </div>
    </div>

  );
};

export default DeletePrinting;
