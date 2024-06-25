import React from 'react';
import AddDelivery from '../delivery/AddDelivery';
import GetDelivery from '../delivery/GetDelivery';
import './deliveryManage.css'; 
import { Link } from 'react-router-dom';
import Home2nav from '../../components/home2nav';



function DeliveryDetails() {
  return (
    <div>
    <Home2nav />
    <div className="delivery-details">
     <div className="section">
        <AddDelivery />
      </div>
      <div className="section">
       <div>
        <h2>Search Material Details</h2>
        <GetDelivery />
       </div> 
       <div>
        <Link to="/DeliveryReport" className="BD-button">DELIVERY REPORT</Link>
       </div> 
       <div>
       <Link to="/DeleteDelivery" className="BD-button">DELETE DELIVERY DETAILS</Link>
       </div> 
       <div>
       <Link to="/SearchDeliveryU" className="BD-button">UPDATE DELIVERY DETAILS</Link>
       </div> 
       </div>
    </div>
    </div>

  );
}

export default DeliveryDetails;
