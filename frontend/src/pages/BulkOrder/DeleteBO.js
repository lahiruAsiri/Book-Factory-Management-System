import React, { useState } from "react";
import axios from "axios";
import "./DeleteBO.css";
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';


const DeleteBulkOrder = () => {
  const [partnerShopName, setPartnerShopName] = useState("");
  const [bulkOrderData, setBulkOrderData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBulkOrderData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/bulkOrders/${encodeURIComponent(partnerShopName)}`
      );
      if (response.status === 200) {
        setBulkOrderData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Bulk order not found");
        setBulkOrderData(null);
      } else {
        setError("Bulk order not found");
        setBulkOrderData(null);
      }
    } catch (error) {
      setError("Bulk order not found");
      setBulkOrderData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchBulkOrderData();
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/bulkOrders/${encodeURIComponent(partnerShopName)}`);
      setBulkOrderData(null);
      setError("Bulk order deleted successfully");
    } catch (error) {
      setError("Error deleting bulk order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <Home2nav />
    <div className="delete-bulk-order-container">
      <h2>Delete a Bulk Order</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={partnerShopName}
          onChange={(e) => setPartnerShopName(e.target.value)}
          placeholder="Enter shop name"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
        <Link to="/BulkOrderManage" className="back-button">
          Back To Menu
        </Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}

      {bulkOrderData && (
        <div className="bulk-order-details">
          <p>
            <strong>Shop Name: </strong>
            {bulkOrderData.partner_shopName}
          </p>
          <p>
            <strong>Customer Name: </strong>
            {bulkOrderData.custermer_name}
          </p>
          <p>
            <strong>Ordered Quantity: </strong>
            {bulkOrderData.ordered_quantity}
          </p>
          <button onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete Bulk Order"}
          </button>
        </div>
      )}
    </div>
    </div>

  );
};

export default DeleteBulkOrder;
