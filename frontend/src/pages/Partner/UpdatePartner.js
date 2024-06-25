import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './UpdatePartner.css'; 
import Home2nav from '../../components/home2nav';


const UpdatePartner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialPartnerShopName = queryParams.get("partnerShopName");

  const [partnerDetails, setPartnerDetails] = useState({
    partner_name: "",
    partner_shopName: initialPartnerShopName || "",
    shop_adresses: "",
    payment_status: ""
  });

  useEffect(() => {
    const fetchPartnerDetails = async () => {
      try {
        const response = await axios.get(`/api/partners/${initialPartnerShopName}`);
        setPartnerDetails(response.data);
      } catch (error) {
        console.error("Error fetching partner details:", error);
      }
    };

    fetchPartnerDetails();
  }, [initialPartnerShopName]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPartnerDetails({ ...partnerDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`/api/partners/${initialPartnerShopName}`, partnerDetails);
      navigate("/SearchPartnerU"); 
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
    <Home2nav />
    <div className="update-partner-container">
      <h2>Update Partner Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Partner Name:
          <input type="text" name="partner_name" value={partnerDetails.partner_name} onChange={handleChange} />
        </label>
        <label>
          Shop Name:
          <input type="text" name="partner_shopName" value={partnerDetails.partner_shopName} onChange={handleChange} disabled />
        </label>
        <label>
          Shop Address:
          <input type="text" name="shop_adresses" value={partnerDetails.shop_adresses} onChange={handleChange} />
        </label>
        <label>
          Payment Status:
          <select name="payment_status" value={partnerDetails.payment_status} onChange={handleChange}>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
    </div>
  );
};

export default UpdatePartner;
