import React, { useState } from "react";
import axios from "axios";
import './AddPartner.css'; 

const AddPartner = () => {
  const [partnerName, setPartnerName] = useState("");
  const [partnerShopName, setPartnerShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Client-side validation
      if (!partnerName || !partnerShopName || !shopAddress || !paymentStatus) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      await axios.post("/api/partners", {
        partner_name: partnerName,
        partner_shopName: partnerShopName,
        shop_adresses: shopAddress,
        payment_status: paymentStatus
      });
      setSuccess(true);
      setError(null);
      setPartnerName("");
      setPartnerShopName("");
      setShopAddress("");
      setPaymentStatus("");
    } catch (error) {
      setError("Error adding partner details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-partner-container">
      <h2>Add New Partner Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Partner Name:</label>
          <input
            type="text"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Partner Shop Name:</label>
          <input
            type="text"
            value={partnerShopName}
            onChange={(e) => setPartnerShopName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Shop Address:</label>
          <input
            type="text"
            value={shopAddress}
            onChange={(e) => setShopAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Payment Status:</label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            required
          >
            <option value="">Select Payment Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Adding..." : "Add Partner Details"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Partner details added successfully!</div>}
    </div>
  );
};

export default AddPartner;
