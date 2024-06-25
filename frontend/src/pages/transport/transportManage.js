import React from 'react';
import AddTransport from '../transport/AddTransport';
import GetTransport from '../transport/getTransport';
import './transportManage.css'; 
import { Link } from 'react-router-dom';
import Home2nav from '../../components/home2nav';



function TransportDetails() {
  return (
    <div>
    <Home2nav />
    <div className="Transport-details">
     <div className="section">
        <AddTransport />
      </div>
      <div className="section">
       <div>
        <h2>Search Transport Details</h2>
        <GetTransport />
       </div> 
       <div>
        <Link to="/TransportReport" className="BD-button">TRANSPORT REPORT</Link>
       </div> 
       <div>
       <Link to="/DeleteTransport" className="BD-button">DELETE TRANSPORT DETAILS</Link>
       </div> 
       <div>
       <Link to="/SearchTransportU" className="BD-button">UPDATE TRANSPORT DETAILS</Link>
       </div> 
       </div>
    </div>
    </div>

  );
}

export default TransportDetails;
