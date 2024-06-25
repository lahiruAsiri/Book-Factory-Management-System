import React from 'react';
import AddBO from '../BulkOrder/AddBO';
import GetBO from '../BulkOrder/GetBO';
import './BulkOrderManage.css'; 
import { Link } from 'react-router-dom';
import Home2nav from '../../components/home2nav';



function BulkOrderDetails() {
  return (
    <div>
    <Home2nav />
    <div className="BO-details">
     <div className="section">
        <AddBO />
      </div>
      <div className="section">
       <div>
        <h2>Search Bulk Order Details</h2>
        <GetBO />
       </div> 
       <div>
        <Link to="/BOreport" className="BD-button">BULK ORDER REPORT</Link>
       </div> 
       <div>
       <Link to="/DeleteBO" className="BD-button">DELETE BULK ORDER DETAILS</Link>
       </div> 
       <div>
       <Link to="/SearchBOU" className="BD-button">UPDATE BULK ORDER DETAILS</Link>
       </div> 
       </div>
    </div>
    </div>

  );
}

export default BulkOrderDetails;
