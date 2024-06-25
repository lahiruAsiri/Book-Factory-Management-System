import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './SearchPartnerU.css'; 
import Home2nav from '../../components/home2nav';


const SearchPartnerForUpdate = () => {
  const [partnerShopName, setPartnerShopName] = useState("");
  const [partnerData, setPartnerData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPartnerData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/partners/${encodeURIComponent(partnerShopName)}`);
      if (response.status === 200) {
        setPartnerData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Partner details not found");
        setPartnerData(null);
      } else {
        setError("Error fetching partner details");
        setPartnerData(null);
      }
    } catch (error) {
      setError("Error fetching partner details");
      setPartnerData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchPartnerData();
  };

  return (
    <div>
    <Home2nav />
    <div className="search-partner-container">
      <h2>Search For Update</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={partnerShopName}
          onChange={(e) => setPartnerShopName(e.target.value)}
          placeholder="Enter partner shop name"
        />
        <button type="submit">Search</button>
        <Link to="/PartnerManage" className="back-button">Back To Menu</Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      
      {partnerData && (
        <div className="partner-details">
          <p><strong>Partner Name: </strong>{partnerData.partner_name}</p>
          <p><strong>Partner Shop Name: </strong>{partnerData.partner_shopName}</p>
          <p><strong>Shop Address: </strong>{partnerData.shop_adresses}</p>
          <p><strong>Payment Status: </strong>{partnerData.payment_status}</p>

          {!loading && !error && (
            <Link to={`/partners/${partnerData.partner_shopName}/UpdatePartner?partnerShopName=${encodeURIComponent(partnerShopName)}`}>
              <button className="update-button">Update Partner</button>
            </Link>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

export default SearchPartnerForUpdate;
