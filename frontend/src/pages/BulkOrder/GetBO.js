import React, { useState } from "react";
import axios from "axios";
import "./GetBO.css";

const GetBulkOrder = () => {
  const [partnerShopName, setPartnerShopName] = useState("");
  const [bulkOrderDetails, setBulkOrderDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchBulkOrderDetails = async () => {
    try {
      const response = await axios.get(`/api/bulkOrders/${encodeURIComponent(partnerShopName)}`);
      if (response.status === 200) {
        setBulkOrderDetails(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Bulk order details not found");
        setBulkOrderDetails(null);
      } else {
        setError("Error fetching bulk order data");
        setBulkOrderDetails(null);
      }
    } catch (error) {
      setError("Error fetching bulk order data");
      setBulkOrderDetails(null);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    await fetchBulkOrderDetails();
  };

  return (
    <div className="get-bulk-order-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={partnerShopName}
          onChange={(e) => setPartnerShopName(e.target.value)}
          placeholder="Enter Customer name"
        />
        <button type="submit">Search</button>
      </form>

      {error && <div className="error">{error}</div>}

      {bulkOrderDetails && (
        <div className="bulk-order-details">
          <h2>Search Result:</h2>
          <div>
            <p><strong>Customer Name: </strong>{bulkOrderDetails.custermer_name}</p>
            <p><strong>Ordered Quantity: </strong>{bulkOrderDetails.ordered_quantity}</p>
            <p><strong>Full Payment: </strong>{bulkOrderDetails.full_payment}</p>
            <p><strong>Done Payment: </strong>{bulkOrderDetails.done_payment}</p>
            <p><strong>Remaining Payment: </strong>{bulkOrderDetails.remaining_payment}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetBulkOrder;
