import React from 'react';
import AddPartner from '../Partner/Addpartner';
import GetPartner from '../Partner/GetPartner';
import './partnerManage.css'; 
import { Link } from 'react-router-dom';
import Home2nav from '../../components/home2nav';



function PartnerDetails() {
  return (
    <div>
    <Home2nav />
    <div className="partner-details">
     <div className="section">
        <AddPartner />
      </div>
      <div className="section">
       <div>
        <h2>Search Partner  Details</h2>
        <GetPartner />
       </div> 
       <div>
        <Link to="/PartnerReport" className="BD-button">PARTNERS REPORT</Link>
       </div> 
       <div>
       <Link to="/DeletePartner" className="BD-button">DELETE PARTNERS DETAILS</Link>
       </div> 
       <div>
       <Link to="/SearchPartnerU" className="BD-button">UPDATE PARTNERS DETAILS</Link>
       </div> 
       </div>
    </div>
    </div>
  );
}

export default PartnerDetails;
