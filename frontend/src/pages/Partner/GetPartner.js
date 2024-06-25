import React, { useState } from "react";
import axios from "axios";
import "./GetPartner.css";

const Getpartner = () => {
  const [partnerShopName, setPartnerShopName] = useState("");
  const [partnerDetails, setPartnerDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchPartnerDetails = async () => {
    try {
      const response = await axios.get(`/api/partners/${encodeURIComponent(partnerShopName)}`);
      if (response.status === 200) {
        setPartnerDetails(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Partner details not found");
        setPartnerDetails(null);
      } else {
        setError("Error fetching partner data");
        setPartnerDetails(null);
      }
    } catch (error) {
      setError("Error fetching partner data");
      setPartnerDetails(null);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    await fetchPartnerDetails();
  };

  return (
    <div className="get-partner-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={partnerShopName}
          onChange={(e) => setPartnerShopName(e.target.value)}
          placeholder="Enter partner shop name"
        />
        <button type="submit">Search</button>
      </form>

      {error && <div className="error">{error}</div>}

      {partnerDetails && (
        <div className="partner-details">
          <h2>Search Result:</h2>
          <div>
            <p><strong>Partner Name: </strong>{partnerDetails.partner_name}</p>
            <p><strong>Partner Shop Name: </strong>{partnerDetails.partner_shopName}</p>
            <p><strong>Shop Address: </strong>{partnerDetails.shop_adresses}</p>
            <p><strong>Payment Status: </strong>{partnerDetails.payment_status}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Getpartner;
