import React, { useState } from "react";
import axios from "axios";
import "./DeletePartner.css";
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';


const DeletePartner = () => {
  const [partnerShopName, setPartnerShopName] = useState("");
  const [partnerData, setPartnerData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPartnerData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/partners/${encodeURIComponent(partnerShopName)}`
      );
      if (response.status === 200) {
        setPartnerData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Partner not found");
        setPartnerData(null);
      } else {
        setError("Partner not found");
        setPartnerData(null);
      }
    } catch (error) {
      setError("Partner not found");
      setPartnerData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchPartnerData();
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/partners/${encodeURIComponent(partnerShopName)}`);
      setPartnerData(null);
      setError("Partner deleted successfully");
    } catch (error) {
      setError("Error deleting partner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <Home2nav />
    <div className="delete-partner-container">
      <h2>Delete a Partner</h2>
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
        <Link to="/PartnerManage" className="back-button">
          Back To Menu
        </Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}

      {partnerData && (
        <div className="partner-details">
          <p>
            <strong>Shop Name: </strong>
            {partnerData.partner_shopName}
          </p>
          <p>
            <strong>Partner Name: </strong>
            {partnerData.partner_name}
          </p>
          <p>
            <strong>Shop Address: </strong>
            {partnerData.shop_adresses}
          </p>
          <button onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete Partner"}
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default DeletePartner;
