import React from 'react';
import AddSM from '../SuppliedMaterial/AddSM';
import GetSM from '../SuppliedMaterial/GetSM';
import './SMmanage.css'; 
import { Link } from 'react-router-dom';
import Home2nav from '../../components/home2nav';



function SuppliedMaterialDetails() {
  return (
    <div>
    <Home2nav />
    <div className="SM-details">
     <div className="section">
        <AddSM />
      </div>
      <div className="section">
       <div>
        <h2>Search Supplied Material Details</h2>
        <GetSM />
       </div> 
       <div>
        <Link to="/SMreport" className="BD-button">SUPPLIED MATERIAL REPORT</Link>
       </div> 
       <div>
       <Link to="/DeleteSM" className="BD-button">DELETE SUPPLIED MATERIAL DETAILS</Link>
       </div> 
       <div>
       <Link to="/SearchSMU" className="BD-button">UPDATE SUPPLIED MATERIAL DETAILS</Link>
       </div> 
       </div>
    </div>
    </div>

  );
}

export default SuppliedMaterialDetails;
