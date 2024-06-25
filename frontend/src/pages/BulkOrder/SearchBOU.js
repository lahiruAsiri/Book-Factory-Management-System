import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './SearchBOU.css'; 
import Home2nav from '../../components/home2nav';


const SearchBulkOrderForUpdate = () => {
  const [customerName, setCustomerName] = useState("");
  const [bulkOrderData, setBulkOrderData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBulkOrderData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/bulkOrders/${encodeURIComponent(customerName)}`);
      if (response.status === 200) {
        setBulkOrderData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Bulk order details not found");
        setBulkOrderData(null);
      } else {
        setError("Error fetching bulk order details");
        setBulkOrderData(null);
      }
    } catch (error) {
      setError("Error fetching bulk order details");
      setBulkOrderData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchBulkOrderData();
  };

  return (
    <div>
    <Home2nav />
    <div className="search-bulk-order-container">
      <h2>Search For Update</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Enter customer name"
        />
        <button type="submit">Search</button>
        <Link to="/BulkOrderManage" className="back-button">Back To Menu</Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      
      {bulkOrderData && (
        <div className="bulk-order-details">
          <p><strong>Customer Name: </strong>{bulkOrderData.custermer_name}</p>
          <p><strong>Ordered Quantity: </strong>{bulkOrderData.ordered_quantity}</p>
          <p><strong>Full Payment: </strong>{bulkOrderData.full_payment}</p>
          <p><strong>Done Payment: </strong>{bulkOrderData.done_payment}</p>
          <p><strong>Remaining Payment: </strong>{bulkOrderData.remaining_payment}</p>

          {!loading && !error && (
            <Link to={`/bulkOrders/${bulkOrderData.customer_name}/UpdateBO?customerName=${encodeURIComponent(customerName)}`}>
              <button className="update-button">Update Bulk Order</button>
            </Link>
          )}
        </div>
      )}
    </div>
    </div>

  );
};

export default SearchBulkOrderForUpdate;
